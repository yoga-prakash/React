import { Document, Page } from 'react-pdf';
import type { PDFPageProxy } from 'pdfjs-dist';
import { toViewportRect } from '../handlers/highlightUtils';
import { useState, useRef, useEffect, useMemo } from 'react';
import type { HighlightRect } from '../handlers/highlightUtils';
import type { HighlightTarget, PdfSide } from '../handlers/comparePdfTexts';

type PdfViewerProps = {
    file: File;
    side: PdfSide;
    highlights: HighlightTarget[];
    selectedPage: number;
};

export function PdfViewer({ file, side, highlights, selectedPage }: PdfViewerProps) {
    const [ownNumPages, setNumPages] = useState(0);
    const [pageNumber, setPage] = useState(1);
    const [width, setWidth] = useState(0);
    const docRef = useRef<HTMLDivElement | null>(null);
    const [pdfPage, setPdfPage] =
        useState<PDFPageProxy | null>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number; }) {
        setNumPages(numPages);
        setPage(1);
        setPdfPage(null);
    };

    useEffect(() => {
        const element = docRef.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) => {
            if (entry) {
                setWidth(entry.contentRect.width);
            }
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, [file]);

    useEffect(() => {
        if (ownNumPages === 0) return;
        const nextPage = Math.min(
            Math.max(selectedPage, 1),
            ownNumPages,
        );
        setPage(nextPage);
    }, [selectedPage, ownNumPages]);

    const viewport = useMemo(() => {
        if (!pdfPage || width <= 0) return null;
        const originalViewport = pdfPage.getViewport({
            scale: 1,
        });
        const scale = width / originalViewport.width;
        return pdfPage.getViewport({ scale });
    }, [pdfPage, width]);

    const pageHighlights = useMemo(() => {
        if (!viewport) return [];
        return highlights.filter(target => target.page === pageNumber).map((target, index) => ({
            ...target,
            index,
            screenRect: toViewportRect(
                viewport,
                target.rect,
            ),
        }));
    }, [highlights, pageNumber, viewport]);

    function getHighlightClass(type: HighlightTarget['type']) {
        if (type === 'added') {
            return 'pdf-highlight--added';
        };
        if (type === 'removed') {
            return 'pdf-highlight--removed';
        };
        return side === 'old' ? 'pdf-highlight--changed-old' : 'pdf-highlight--changed-new';
    };

    return (
        <section className="pdf-viewer-panel">
            <h2>
                {side === 'old' ? 'Original PDF' : 'Revised PDF'}
            </h2>
            <div className="pdf-frame" ref={docRef}>
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={error => { console.error('Failed to load PDF:', error); }}
                    loading={<p>Loading PDF...</p>}
                    error={<p>Unable to display this PDF.</p>}
                >
                    {width > 0 && (
                        <div className="pdf-page-wrapper">
                            <Page
                                key={`${side}-${pageNumber}`}
                                pageNumber={pageNumber}
                                width={width}
                                onLoadSuccess={setPdfPage}
                            />
                            {pageHighlights.map(target => {
                                const rect: HighlightRect = target.screenRect;
                                return (
                                    <div
                                        key={`${target.id}-${target.index}`}
                                        className={[
                                            'pdf-highlight',
                                            getHighlightClass(target.type),
                                        ].join(' ')}
                                        title={target.text}
                                        style={{
                                            left: rect.x,
                                            top: rect.y,
                                            width: rect.width,
                                            height: rect.height,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    )}
                </Document>
            </div>
            <div className="pdf-viewer-controls">
                <p>
                    Page {pageNumber} of {ownNumPages}
                </p>
                <button
                    disabled={pageNumber <= 1}
                    onClick={() => setPage(previous => Math.max(previous - 1, 1))}>
                    Previous
                </button>
                <button
                    disabled={pageNumber >= ownNumPages}
                    onClick={() => setPage(previous => Math.min(previous + 1, ownNumPages))}>
                    Next
                </button>
            </div>
        </section>
    );
};