
import { diffWords, type Change } from 'diff';
import type { TextItem } from 'react-pdf';
import type { TextItemPage } from './typeguard';
import { getTextRect } from './extractTextPdf';
import type { HighlightRect } from './highlightUtils';

export type DifferenceType = 'added' | 'removed' | 'changed';
export type PdfSide = 'old' | 'new';

export type HighlightTarget = {
    id: string;
    page: number;
    rect: HighlightRect;
    type: DifferenceType;
    text: string;
};

export type ComparisonDifference = {
    id: string;
    page: number;
    type: DifferenceType;
    oldText: string;
    newText: string;
};

export type PdfComparisonResult = {
    differences: ComparisonDifference[];
    oldHighlights: HighlightTarget[];
    newHighlights: HighlightTarget[];
};

type ItemSpan = {
    item: TextItem;
    start: number;
    end: number;
};

type TextSegment = {
    start: number;
    end: number;
    text: string;
};

type EditGroup = {
    removed: TextSegment[];
    added: TextSegment[];
};

function normalizeText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
}

function buildPageText(items: TextItem[]): { text: string; spans: ItemSpan[] } {
    const spans: ItemSpan[] = [];
    let text = '';
    for (const item of items) {
        const itemText = normalizeText(item.str);
        if (!itemText) continue;
        if (text.length > 0) {
            text += ' ';
        }
        const start = text.length;
        text += itemText;
        spans.push({
            item,
            start,
            end: text.length,
        });
    };
    return { text, spans };
};

function getOverlappingItems(segments: TextSegment[], spans: ItemSpan[]): TextItem[] {
    const matched: TextItem[] = [];
    const seen = new Set<TextItem>();
    for (const segment of segments) {
        for (const span of spans) {
            const overlaps =
                segment.start < span.end &&
                segment.end > span.start;

            if (overlaps && !seen.has(span.item)) {
                seen.add(span.item);
                matched.push(span.item);
            };
        };
    };
    return matched;
};

function getGroupText(segments: TextSegment[]): string {
    return segments.map(segment => segment.text).join('').trim();
};

export function comparePdfPages(oldPages: TextItemPage[], newPages: TextItemPage[]): PdfComparisonResult {
    const differences: ComparisonDifference[] = [];
    const oldHighlights: HighlightTarget[] = [];
    const newHighlights: HighlightTarget[] = [];
    const oldPageMap = new Map(oldPages.map(page => [page.page, page.items]));
    const newPageMap = new Map(newPages.map(page => [page.page, page.items]));
    const maxPage = Math.max(
        0,
        ...oldPages.map(page => page.page),
        ...newPages.map(page => page.page),
    );
    let differenceNumber = 0;
    for (let page = 1; page <= maxPage; page++) {
        const oldItems = oldPageMap.get(page) ?? [];
        const newItems = newPageMap.get(page) ?? [];
        const oldPageText = buildPageText(oldItems);
        const newPageText = buildPageText(newItems);
        if (oldPageText.text === newPageText.text) continue;
        const changes: Change[] = diffWords(oldPageText.text, newPageText.text);
        let oldOffset = 0;
        let newOffset = 0;
        let group: EditGroup = {
            removed: [],
            added: [],
        };
        const flushGroup = () => {
            if (group.removed.length === 0 && group.added.length === 0) {
                return;
            };
            differenceNumber++;
            const id = `difference-${differenceNumber}`;
            const hasRemoved = group.removed.length > 0;
            const hasAdded = group.added.length > 0;
            const type: DifferenceType = hasRemoved && hasAdded ? 'changed' : hasAdded ? 'added' : 'removed';
            const oldText = getGroupText(group.removed);
            const newText = getGroupText(group.added);
            differences.push({
                id,
                page,
                type,
                oldText,
                newText,
            });
            const oldMatchedItems = getOverlappingItems(
                group.removed,
                oldPageText.spans,
            );
            const newMatchedItems = getOverlappingItems(
                group.added,
                newPageText.spans,
            );
            for (const item of oldMatchedItems) {
                oldHighlights.push({
                    id,
                    page,
                    rect: getTextRect(item),
                    type,
                    text: item.str,
                });
            };
            for (const item of newMatchedItems) {
                newHighlights.push({
                    id,
                    page,
                    rect: getTextRect(item),
                    type,
                    text: item.str,
                });
            };
            group = {
                removed: [],
                added: [],
            };
        };
        for (const change of changes) {
            const value = change.value;
            if (change.added) {
                group.added.push({
                    start: newOffset,
                    end: newOffset + value.length,
                    text: value,
                });
                newOffset += value.length;
            } else if (change.removed) {
                group.removed.push({
                    start: oldOffset,
                    end: oldOffset + value.length,
                    text: value,
                });
                oldOffset += value.length;
            } else {
                flushGroup();
                oldOffset += value.length;
                newOffset += value.length;
            };
        };
        flushGroup();
    };
    return {
        differences,
        oldHighlights,
        newHighlights,
    };
};
