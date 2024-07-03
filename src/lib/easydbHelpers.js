import { l10n, masks, schemas } from './easydb';

export function maskObj(data) {
  return masks[data._mask];
}

// Given a data JSON object and a field from a mask, return the schema for that column
export function findSchemaColumn(table, field) {
  return schemas[table].columns.find((column) => column.name === field.column_name_hint);
}

// Given a data JSON object and the field definition from a mask, return the label of the field with the language code lang
export function fieldLabel(table, field, lang) {
  return l10n[`schema.${table}.column.${field.column_name_hint}`][lang];
}

// Given a data JSON object and the field definition from a mask, return a boolean whether it exists in the data
export function hasField(data, table, field) {
  // Depending on whether we are dealing with a linked table, we have
  // a different nesting of the data.
  if (table in data) {
    return field.column_name_hint in data[table];
  } else {
    return field.column_name_hint in data;
  }
}

// Given a data JSON object and the field definition from a mask, return the value of the field
export function fieldData(data, table, field) {
  // Depending on whether we are dealing with a linked table, we have
  // a different nesting of the data.
  if(table in data) {
    return data[table][field.column_name_hint];  
  } else {
    return data[field.column_name_hint];
  }
}

export function hasSubData(data, table, field) {
  return `_nested:${field.other_table_name_hint}` in data[table];
}

export function linkedSubData(data, table, field) {
  // I am very much concerned with the [0] here as I have no idea why the data
  // is a list in the first place.
  return data[table][`_nested:${field.other_table_name_hint}`][0];
}

export function splitterTitle(data, table, options, lang) {
  return l10n[`mask.${schemas[table].table_id}.${maskObj(data).name}.splitter.${String(options.splitterIdx)}`][lang];
}

export function hasContent(data, table, fields) {
  for (let field of fields) {
    if ((field.kind === 'field') && (hasField(data, table, field))) {
      return true;
    }
    if ((field.kind === 'linked-table') && (hasSubData(data, table, field))) {
      return true;
    }
  }
  return false;
}