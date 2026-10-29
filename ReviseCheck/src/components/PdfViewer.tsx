import { Document, Page } from 'react-pdf';
import { useState, useRef, useEffect } from 'react';

export function PdfViewer({ file }: { file: File }) {
    const [ownNumPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPage] = useState<number>(1);
    const [width, setWidth] = useState<number>(0);
    const docRef = useRef<HTMLDivElement | null>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPage(1);
    };

    useEffect(() => {
        const element = docRef.current;
        if (!element) return;
        const observe = new ResizeObserver(([entry]) => {
            setWidth(entry.contentRect.width);
        });
        observe.observe(element);
        return () => observe.disconnect();
    }, [file]);

    return (
        <>
            <div className="pdf-frame" ref={docRef}>
                <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                    {width > 0 && <Page pageNumber={pageNumber} width={width} />}
                </Document>
            </div>
            <p>Page {pageNumber} of {ownNumPages}</p>
            <button disabled={pageNumber <= 1} onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Previous</button>
            <button disabled={pageNumber >= ownNumPages} onClick={() => setPage(prev => Math.min(prev + 1, ownNumPages))}>Next</button>
        </>
    );
};