// JSON-LD sits inside a <script> tag, so every "<" is written as <: no string in the data can ever close the tag.
export const jsonLdString = (data: unknown): string => JSON.stringify(data).replace(/</g, "\\u003c");
