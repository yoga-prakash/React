import { pdfjs } from 'react-pdf';
import type { TextItem } from 'react-pdf';
import type { TextItemPage } from './typeguard';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { isForm, isPdf, isTextItem } from './typeguard';

export function getTextRect(item: TextItem) {
    const [, , , , x, y] = item.transform;
    return {
        x,
        y,
        width: item.width,
        height: item.height,
    };
};

export async function extractPageTexts(pdf: PDFDocumentProxy) {
    const pageTexts: string[] = [];
    const numPages = pdf.numPages;
    const wordLocationsInPdf: TextItemPage[] = [];
    for (let page = 1; page <= numPages; page++) {
        const pageObj = await pdf.getPage(page);
        const content = await pageObj.getTextContent();
        const textItems = content.items.filter(isTextItem);
        wordLocationsInPdf.push({
            page,
            items: textItems,
        });
        const text = textItems.map(item => item.str).join(' ').replace(/\s+/g, ' ').trim();
        pageTexts.push(text);
    };
    return {
        texts: pageTexts,
        noOfPages: numPages,
        wordLocationsInPdf,
    };
};

export async function onDocumentUpload(formData: unknown) {
    if (!isForm(formData)) {
        throw new Error('formData is not FormData');
    };
    const pdfBlob1 = formData.get('pdfDocument1');
    const pdfBlob2 = formData.get('pdfDocument2');
    if (!isPdf(pdfBlob1) || !isPdf(pdfBlob2)) {
        throw new Error('Please provide two valid PDF files.');
    };
    const docRawBytes1 = new Uint8Array(await pdfBlob1.arrayBuffer());
    const loadingTask1Pdf = await pdfjs.getDocument({ data: docRawBytes1 }).promise;
    const { texts: texts1, noOfPages: pageInDoc1, wordLocationsInPdf: wordLocationsInPdf1 } = await extractPageTexts(loadingTask1Pdf);
    const docRawBytes2 = new Uint8Array(await pdfBlob2.arrayBuffer());
    const loadingTask2Pdf = await pdfjs.getDocument({ data: docRawBytes2 }).promise;
    const { texts: texts2, noOfPages: pageInDoc2, wordLocationsInPdf: wordLocationsInPdf2 } = await extractPageTexts(loadingTask2Pdf);
    return {
        pdfBlob1,
        pdfBlob2,
        texts1,
        texts2,
        pageInDoc1,
        pageInDoc2,
        wordLocationsInPdf1,
        wordLocationsInPdf2,
    };
};
