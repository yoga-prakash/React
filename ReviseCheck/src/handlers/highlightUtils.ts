import type { PageViewport } from 'pdfjs-dist';

export type HighlightRect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export function toViewportRect(
    viewport: PageViewport,
    rect: HighlightRect,
): HighlightRect {
    const [x1, y1] = viewport.convertToViewportPoint(
        rect.x,
        rect.y,
    );

    const [x2, y2] = viewport.convertToViewportPoint(
        rect.x + rect.width,
        rect.y + rect.height,
    );

    return {
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
    };
}