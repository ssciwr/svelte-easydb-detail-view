import { easydbDataStore } from './stores';
import { get } from 'svelte/store';
import { bestLanguage } from './l10n';

export function maskObj(data) {
  return get(easydbDataStore).masks[data._mask];
}

// Given a data JSON object and a field from a mask, return the schema for that column
export function findSchemaColumn(table, field) {
  return get(easydbDataStore).schemas[table].columns.find((column) => column.name === field.column_name_hint);
}

// Given a data JSON object and the field definition from a mask, return the label of the field with the language code lang
export function fieldLabel(table, field, lang) {
  if (field.column_name_hint) {
    return bestLanguage(get(easydbDataStore).l10n[`schema.${table}.column.${field.column_name_hint}`], lang);
  }
  if (field.other_table_name_hint) {
    return bestLanguage(get(easydbDataStore).l10n[`schema.${field.other_table_name_hint}.name`], lang);
  }
  return "Error retrieving label";
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
  const dtable = table in data ? data[table] : data;
  return `_reverse_nested:${field.other_table_name_hint}:${field.other_column_name_hint}` in dtable;
}

export function reverseLinkedSubData(data, table, field) {
  const dtable = table in data ? data[table] : data;
  return dtable[`_reverse_nested:${field.other_table_name_hint}:${field.other_column_name_hint}`];
}

export function splitterTitle(data, table, options, lang) {
  return bestLanguage(get(easydbDataStore).l10n[`mask.${get(easydbDataStore).schemas[table].table_id}.${maskObj(data).name}.splitter.${String(options.splitterIdx)}`], lang);
}

export function hasContent(data, table, fields) {
  for (let field of fields) {
    if (((field.kind === 'field') || (field.kind === 'link')) && (hasField(data, table, field))) {
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