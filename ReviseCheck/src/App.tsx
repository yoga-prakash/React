import './App.css';
import { pdfjs } from 'react-pdf';
import { useState } from 'react';
import { Form } from './components/Form';
import { PdfViewer } from './components/PdfViewer';
import { onDocumentUpload } from './handlers/extractTextPdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function App() {

  const [files, setFiles] = useState<{ first?: File; second?: File }>({});

  async function handleUpload(formData: unknown) {
    const result = await onDocumentUpload(formData);
    // diff calculation will go here later, using result.pdfText1 / result.pdfText2
    setFiles({ first: result.pdfBlob1, second: result.pdfBlob2 });
  }

  return (
    <div className="pdf-info">
      <Form onShow={handleUpload} />
      {files.first && <PdfViewer file={files.first} />}
      {files.second && <PdfViewer file={files.second} />}
    </div>
  );
};