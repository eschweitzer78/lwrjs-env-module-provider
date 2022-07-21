/**
 * Generate a module string which fulfills a label request
 *
 * @param label - The label value
 * @param fileType - The module file type: html, css or js
 */
export function generateModule(value) {
    return `export default \`${value}\``;
}
