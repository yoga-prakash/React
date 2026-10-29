# ReviseCheck - PDF Content Diff Checker

ReviseCheck is a web app that compares the text content of two versions of a PDF and shows exactly what changed. It saves you from searching manually.

# Note

The pdfs to be uploaded must be either downloaded as pdf by ctrl/cmd + p(print option) from browsers as direct texts are extracted, so please avoid using scanned pdfs like adobe scanners and image to pdfs.

## Features

- Upload two PDFs (original and changed) and view them side by side
- Page navigation for each PDF
- Text extraction from both PDFs
- Difference detection with a summary of **Added**, **Removed** and **Changed** counts
- Text differences list showing each change with its page number (old text vs. new text)
- Highlighting of the differences directly on the rendered PDF pages

## Tech Stack

- React + TypeScript
- Vite+
- react-pdf (using pdf.js)
- diff (Myers algorithm)

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
vp dev
```

Then open the local URL shown in the terminal.

## How to Use

1. Upload the original PDF in the first box.
2. Upload the changed PDF in the second box.
3. Click **Show both Pdfs**.
4. Review the comparison summary, the list of text differences, and the highlighted pages side by side.