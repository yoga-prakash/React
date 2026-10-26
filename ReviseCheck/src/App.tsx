import './App.css';
import { useState } from 'react';
import { Form } from './components/Form';
import { PdfViewer } from './components/PdfViewer';
import { isPdf, isForm } from './handlers/typeguard';

export default function App() {

  const [files, setFiles] = useState<{ first?: File; second?: File }>({});

  function onDocumentUpload(formData: unknown) {
    if (!isForm(formData)) throw new Error("formData is not of FormData");
    const pdfDoc1 = formData.get("pdfDocument1");
    const pdfDoc2 = formData.get("pdfDocument2");
    if (!isPdf(pdfDoc1) || !isPdf(pdfDoc2)) throw new Error("Please provide a valid pdf");
    setFiles({ first: pdfDoc1, second: pdfDoc2 });
  };

  return (
    <div className="pdf-info">
      <Form onShow={onDocumentUpload} />
      {files.first && <PdfViewer file={files.first} />}
      {files.second && <PdfViewer file={files.second} />}
    </div>
  );
};