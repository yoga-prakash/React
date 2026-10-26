export function isPdf(pdf: unknown): pdf is File {
    return pdf instanceof File && pdf.type === "application/pdf";
};

export function isForm(form: unknown): form is FormData {
    return form instanceof FormData;
};