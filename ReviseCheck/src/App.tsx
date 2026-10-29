import './App.css';
import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { Form } from './components/Form';
import { PdfViewer } from './components/PdfViewer';
import { onDocumentUpload } from './handlers/extractTextPdf';
import { comparePdfPages } from './handlers/comparePdfTexts';
import type { ComparisonDifference, HighlightTarget } from './handlers/comparePdfTexts';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type UploadedFiles = {
  first?: File;
  second?: File;
};

export default function App() {
  const [files, setFiles] = useState<UploadedFiles>({});
  const [differences, setDifferences] = useState<ComparisonDifference[]>([]);
  const [oldHighlights, setOldHighlights] = useState<HighlightTarget[]>([]);
  const [newHighlights, setNewHighlights] = useState<HighlightTarget[]>([]);
  const [selectedDifferenceId, setSelectedDifferenceId] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(formData: unknown) {
    setLoading(true);
    setError(null);
    try {
      const result = await onDocumentUpload(formData);
      const comparison = comparePdfPages(result.wordLocationsInPdf1, result.wordLocationsInPdf2);
      setFiles({
        first: result.pdfBlob1,
        second: result.pdfBlob2,
      });
      setDifferences(comparison.differences);
      setOldHighlights(comparison.oldHighlights);
      setNewHighlights(comparison.newHighlights);
      const firstDifference = comparison.differences[0];
      setSelectedDifferenceId(
        firstDifference?.id ?? null,
      );
      setSelectedPage(firstDifference?.page ?? 1);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(message);
      setFiles({});
      setDifferences([]);
      setOldHighlights([]);
      setNewHighlights([]);
      setSelectedDifferenceId(null);
      setSelectedPage(1);
    } finally {
      setLoading(false);
    };
  };

  function selectDifference(difference: ComparisonDifference) {
    setSelectedDifferenceId(difference.id);
    setSelectedPage(difference.page);
  };

  const addedCount = differences.filter(item => item.type === 'added').length;
  const removedCount = differences.filter(item => item.type === 'removed').length;
  const changedCount = differences.filter(item => item.type === 'changed').length;
  return (
    <main className="pdf-info">
      <Form onShow={handleUpload} />
      {loading && (
        <p className="comparison-status">
          Extracting and comparing PDFs...
        </p>
      )}
      {error && (
        <p className="comparison-error" role="alert">
          {error}
        </p>
      )}
      {files.first && files.second && (
        <>
          <section className="comparison-summary">
            <h2>Comparison results</h2>

            <div className="comparison-stats">
              <span className="stat-added">
                Added: {addedCount}
              </span>

              <span className="stat-removed">
                Removed: {removedCount}
              </span>

              <span className="stat-changed">
                Changed: {changedCount}
              </span>
            </div>

            {differences.length === 0 && (
              <p>
                No text differences found.
              </p>
            )}
          </section>

          <div className="comparison-layout">
            <aside className="differences-panel">
              <h2>Text differences</h2>

              {differences.length === 0 ? (
                <p>
                  The extracted text matches
                  on all compared pages.
                </p>
              ) : (
                <ul className="difference-list">
                  {differences.map(difference => {
                    const selected =
                      difference.id ===
                      selectedDifferenceId;

                    const label =
                      difference.type === 'added'
                        ? 'Added'
                        : difference.type === 'removed'
                          ? 'Removed'
                          : 'Changed';

                    return (
                      <li
                        key={difference.id}
                      >
                        <button
                          type="button"
                          className={[
                            'difference-item',
                            `difference-item--${difference.type}`,
                            selected
                              ? 'is-selected'
                              : '',
                          ].join(' ')}
                          aria-pressed={selected}
                          onClick={() =>
                            selectDifference(
                              difference,
                            )
                          }
                        >
                          <span className="difference-meta">
                            <strong>
                              {label}
                            </strong>

                            <span>
                              Page {difference.page}
                            </span>
                          </span>

                          {difference.oldText && (
                            <span className="difference-old">
                              − {difference.oldText}
                            </span>
                          )}

                          {difference.newText && (
                            <span className="difference-new">
                              + {difference.newText}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </aside>

            <div className="pdf-columns">
              <PdfViewer
                file={files.first}
                side="old"
                highlights={oldHighlights}
                selectedPage={selectedPage}
              />

              <PdfViewer
                file={files.second}
                side="new"
                highlights={newHighlights}
                selectedPage={selectedPage}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}