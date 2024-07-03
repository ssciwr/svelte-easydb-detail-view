import { writeFile } from 'fs/promises';

// TODO: In the reorganization functions below we could also cull data that we don't need
// in order to reduce the bundle size. This is a low priority performance optimization.

// This "trick" is super-unfortunate, but Svelte Preprocessing is fully regex-based
// and any attempts to pass stringified data that contains backslashes will result in
// a particularly bad instance of Regex hell. We therefore resort to doing this in
// the serialization and ondoing it in the deserialization as part of the injected code.
function escape(str) {
  return str.replaceAll("\\\"", "__ESCAPED_QUOTES__").replaceAll("\\", "__BACKSLASH__");
}

// We massage the API response a bit to fit our needs better. This makes it more convenient
// to work with the data in the Svelte component.
function reorganize_masks(maskdata) {
  let newdata = {};
  for (let mask of maskdata.masks) {
    newdata[mask.name] = mask;
  }
  return newdata;
}

// We do the same for the schema data, where we want to access the tables directly by
// their name in the Svelte component.
function reorganize_schemas(schemadata) {
  let newdata = {};
  for (let table of schemadata.tables) {
    newdata[table.name] = table;
    console.log(table.name);
  }
  return newdata;
}

// Get a session token from the EasyDB instance
const token_response = await fetch('https://heidicon.ub.uni-heidelberg.de/api/session');
if(token_response.status != 200) {
  throw new Error("Could not get a session token from the EasyDB instance.");
}
const token_json = await token_response.json();
const token = token_json.token;

// Authenticcate the session token
const auth_response = await fetch(
  'https://heidicon.ub.uni-heidelberg.de/api/session/authenticate?' +
  new URLSearchParams({
    token: token,
    method: 'anonymous',
  }),
  {
    method: 'POST',
  }
);
if(auth_response.status != 200) {
  throw new Error("Could not authenticate the session token.");
}

// Fetch all the masks for this instance
const mask_response = await fetch(
  'https://heidicon.ub.uni-heidelberg.de/api/v1/mask/HEAD?' +
  new URLSearchParams({
    "token": token,
    "format": "json",
  }),
);
if(mask_response.status != 200) {
  throw new Error("Could not fetch the masks for this instance");
}
const masks = await mask_response.json();

// Fetch all the l10n data for this instance
const l10n_response = await fetch(
  'https://heidicon.ub.uni-heidelberg.de/api/v1/l10n/user/HEAD?' +
  new URLSearchParams({
    "token": token,
  }),
);
if(l10n_response.status != 200) {
  throw new Error("Could not fetch the l10n data for this instance");
}
const l10n = await l10n_response.json();

// Fetch the schema data for this instance
const schema_response = await fetch(
  'https://heidicon.ub.uni-heidelberg.de/api/v1/schema/user/HEAD?' +
  new URLSearchParams({
    "token": token,
    "format": "json",
  }),
);
if(schema_response.status != 200) {
  throw new Error("Could not fetch the schema data for this instance");
}
const schema = await schema_response.json();

// Inject the data into the Svelte component as a constant
const content =
  `export const masks = JSON.parse('${escape(JSON.stringify(reorganize_masks(masks)))}'.replaceAll("__ESCAPED_QUOTES__", "\\\\\\"").replaceAll("__BACKSLASH__", "\\\\"));\n` +
  `export const l10n = JSON.parse('${escape(JSON.stringify(l10n))}'.replaceAll("__ESCAPED_QUOTES__", "\\\\\\"").replaceAll("__BACKSLASH__", "\\\\"));\n` +
  `export const schemas = JSON.parse('${escape(JSON.stringify(reorganize_schemas(schema)))}'.replaceAll("__ESCAPED_QUOTES__", "\\\\\\"").replaceAll("__BACKSLASH__", "\\\\"));\n`;

try {
  await writeFile('src/lib/easydb.js', content);
  console.log('Successfully regenerated the EasyDB data.');
} catch (error) {
  console.error('Error writing the EasyDB data:', error);
}
