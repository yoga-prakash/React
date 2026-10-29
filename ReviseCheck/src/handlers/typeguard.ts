import type { TextItem, TextMarkedContent } from "react-pdf";

export function isPdf(pdf: unknown): pdf is File {
    return pdf instanceof File && pdf.type === "application/pdf";
};

export function isForm(form: unknown): form is FormData {
    return form instanceof FormData;
};

export type TextItemPage = {
    page: number;
    items: TextItem[];
};

export function isTextItem(item: TextItem | TextMarkedContent): item is TextItem {
    return 'str' in item && typeof item.str === 'string';
}