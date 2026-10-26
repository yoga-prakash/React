# PDF Content Diff Checker

A web app that compares the text content of two versions of a PDF and shows what changed. It saves you from searching manually, especially for large documents.

## Features

- Upload two PDFs (original and changed) and view them side by side
- Page navigation for each PDF
- Text difference highlighting (in progress)

## Tech Stack

- React + TypeScript
- Vite
- react-pdf

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

## Roadmap

- [ ] Extract text from both PDFs
- [ ] Highlight differences
- [ ] Desktop version using Tauri and Rust