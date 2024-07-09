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
  const dtable = table in data ? data[table] : data;
  return field.column_name_hint in dtable;
}

// Given a data JSON object and the field definition from a mask, return the value of the field
export function fieldData(data, table, field) {
  const dtable = table in data ? data[table] : data;
  return dtable[field.column_name_hint];  
}

export function hasSubData(data, table, field) {
  const dtable = table in data ? data[table] : data;
  return `_nested:${field.other_table_name_hint}` in dtable;
}

export function linkedSubData(data, table, field) {
  const dtable = table in data ? data[table] : data;
  return dtable[`_nested:${field.other_table_name_hint}`];
}

export function hasReverseSubData(data, table, field) {
  return `_reverse_nested:${field.other_table_name_hint}:${field.other_column_name_hint}` in data[table];
}

export function reverseLinkedSubData(data, table, field) {
  return data[table][`_reverse_nested:${field.other_table_name_hint}:${field.other_column_name_hint}`];
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
    if ((field.kind === 'reverse-linked-table') && (hasReverseSubData(data, table, field))) {
      return true;
    }
  }
  return false;
}