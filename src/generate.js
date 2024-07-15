import { writeFile } from 'fs/promises';
import { accessInstance } from './lib/easydbData.js';

// This "trick" is super-unfortunate, but Svelte Preprocessing is fully regex-based
// and any attempts to pass stringified data that contains backslashes will result in
// a particularly bad instance of Regex hell. We therefore resort to doing this in
// the serialization and ondoing it in the deserialization as part of the injected code.
function escape(str) {
  return str.replaceAll("\\\"", "__ESCAPED_QUOTES__").replaceAll("\\", "__BACKSLASH__");
}

const instance = "https://heidicon.ub.uni-heidelberg.de";
const data = await accessInstance(instance);

// Inject the data into the Svelte component as a constant
const content =
  `export const pregen_instance = '${instance}';\n` +
  `export const pregen_masks = JSON.parse('${escape(JSON.stringify(data.masks))}'.replaceAll("__ESCAPED_QUOTES__", "\\\\\\"").replaceAll("__BACKSLASH__", "\\\\"));\n` +
  `export const pregen_l10n = JSON.parse('${escape(JSON.stringify(data.l10n))}'.replaceAll("__ESCAPED_QUOTES__", "\\\\\\"").replaceAll("__BACKSLASH__", "\\\\"));\n` +
  `export const pregen_schemas = JSON.parse('${escape(JSON.stringify(data.schemas))}'.replaceAll("__ESCAPED_QUOTES__", "\\\\\\"").replaceAll("__BACKSLASH__", "\\\\"));\n`;

try {
  await writeFile('src/lib/easydbPregen.js', content);
  console.log('Successfully regenerated the EasyDB data.');
} catch (error) {
  console.error('Error writing the EasyDB data:', error);
}
