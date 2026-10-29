import { pdfjs } from 'react-pdf';
import { isForm, isPdf } from './typeguard';
import { diffWords, type Change } from 'diff';
import { type PDFDocumentProxy } from 'pdfjs-dist';
import { isTextItem, type TextItemPage } from '../handlers/typeguard';

export async function extractPageTexts(pdf: PDFDocumentProxy) {
    const pageTexts: string[] = [];
    const numPages: number = pdf.numPages;
    const wordDetails: TextItemPage[] = []
    try {
        for (let page = 1; page <= numPages; page++) {
            const pageObj = await pdf.getPage(page);
            const content = await pageObj.getTextContent();

            const textItems = content.items.filter(isTextItem);

            wordDetails.push({
                page: page,
                items: textItems
            });
            console.log("wordDetails :", wordDetails);

            const text = textItems.map((item) => ('str' in item ? item.str : '')).join(' ').replace(/\s+/g, ' ').trim();
            pageTexts.push(text);
        };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error occured in extracting text from a single page."
        console.log(errorMessage);
    };
    return { texts: pageTexts, noOfPages: numPages, wordLocationsInPdf: wordDetails };
};

export async function onDocumentUpload(formData: unknown) {

    if (!isForm(formData)) throw new Error("formData is not of FormData");
    const pdfBlob1 = formData.get("pdfDocument1");
    const pdfBlob2 = formData.get("pdfDocument2");
    if (!isPdf(pdfBlob1) || !isPdf(pdfBlob2)) throw new Error("Please provide a valid pdf");

    const docRawBytes1 = new Uint8Array(await pdfBlob1.arrayBuffer());
    const loadingTask1Pdf = await pdfjs.getDocument({ data: docRawBytes1 }).promise;
    const { texts: texts1, noOfPages: pageInDoc1, wordLocationsInPdf: wordLocationsInPdf1 } = await extractPageTexts(loadingTask1Pdf);

    const docRawBytes2 = new Uint8Array(await pdfBlob2.arrayBuffer());
    const loadingTask2Pdf = await pdfjs.getDocument({ data: docRawBytes2 }).promise;
    const { texts: texts2, noOfPages: pageInDoc2, wordLocationsInPdf: wordLocationsInPdf2 } = await extractPageTexts(loadingTask2Pdf);
    let differedWords: Change[] = [];

    for (let i = 0; i < pageInDoc1 && i < pageInDoc2; i++) {
        console.log("i and total pages of both pdfs: ", i, pageInDoc1, pageInDoc2);
        differedWords.push(...diffWords(texts1[i], texts2[i]));
    };

    return { pdfBlob1, pdfBlob2, differedWords, wordLocationsInPdf1, wordLocationsInPdf2 };
};

