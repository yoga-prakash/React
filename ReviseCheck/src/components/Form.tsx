export function Form({ onShow }: { onShow: (formData: unknown) => void }) {
    return (
        <div className="pdf-submission-form">
            <form action={onShow}>
                <label> Upload your first pdf here
                    <input type="file" id="pdf-file1" name="pdfDocument1" accept=".pdf,application/pdf" required />
                </label>
                <label>Upload your changed pdf here
                    <input type="file" id="pdf-file2" name="pdfDocument2" accept=".pdf,application/pdf" required />
                </label>
                <button type="submit">Show both Pdfs</button>
            </form>
        </div>
    );
}