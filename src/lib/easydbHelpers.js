import { easydbInstanceDataStore } from './stores';
import { get } from 'svelte/store';
import { bestLanguage } from './l10n';

export function maskObj(data, easydbInstanceDataStoreParam = null) {
  const store = easydbInstanceDataStoreParam || easydbInstanceDataStore;
  const instanceData = get(store);
  if (!instanceData || !instanceData.masks) {
    console.error('maskObj: EasyDB instance data not available or masks missing');
    return { fields: [], table_name_hint: '' };
  }
  return instanceData.masks[data._mask] || { fields: [], table_name_hint: '' };
}

// Given a data JSON object and a field from a mask, return the schema for that column
export function findSchemaColumn(table, field, easydbInstanceDataStoreParam = null) {
  const store = easydbInstanceDataStoreParam || easydbInstanceDataStore;
  const instanceData = get(store);
  if (!instanceData || !instanceData.schemas || !instanceData.schemas[table]) {
    console.error(`🔍 [DEBUG] findSchemaColumn: Schema not found for table "${table}"`);
    return {};
  }
  const result = instanceData.schemas[table].columns.find((column) => column.name === field.column_name_hint) || {};
  return result;
}

// Given a data JSON object and the field definition from a mask, return the label of the field with the language code lang
export function fieldLabel(table, field, lang, easydbInstanceDataStoreParam = null) {
  const store = easydbInstanceDataStoreParam || easydbInstanceDataStore;
  const instanceData = get(store);
  if (!instanceData || !instanceData.l10n) {
    console.error('fieldLabel: EasyDB instance data or l10n not available');
    return "Label not available";
  }
  
  if (field.column_name_hint) {
    return bestLanguage(instanceData.l10n[`schema.${table}.column.${field.column_name_hint}`], [lang]);
  }
  if (field.other_table_name_hint) {
    return bestLanguage(instanceData.l10n[`schema.${field.other_table_name_hint}.name`], [lang]);
  }
  return "Error retrieving label";
}

// Given a data JSON object and the field definition from a mask, return the value of the field
export function fieldData(data, table, field) {
  const dtable = table in data ? data[table] : data;
  return dtable[field.column_name_hint];  
}

// Given a data JSON object and the field definition from a mask, return a boolean whether it exists in the data
export function hasField(data, table, field, easydbInstanceDataStoreParam = null) {
  // Boolean fields with custom_settings.boolean_show_false set to false should not be shown if the value is false
  if (
    (field.kind === 'field') &&
    (findSchemaColumn(table, field, easydbInstanceDataStoreParam).type === 'boolean') &&
    (field.custom_settings.boolean_show_false === false) &&
    (fieldData(data, table, field) === false)
  ) {
    return false;
  }

  // For all other fields, check if the field exists in the data
  const dtable = table in data ? data[table] : data;
  return field.column_name_hint in dtable;
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

export function splitterTitle(data, table, options, lang, easydbInstanceDataStoreParam = null) {
  const store = easydbInstanceDataStoreParam || easydbInstanceDataStore;
  const instanceData = get(store);
  if (!instanceData || !instanceData.l10n || !instanceData.schemas) {
    console.error('splitterTitle: EasyDB instance data, l10n, or schemas not available');
    return "Title not available";
  }
  
  const mask = maskObj(data, store);
  const tableId = instanceData.schemas[table]?.table_id;
  if (!tableId || !mask?.name) {
    console.error(`splitterTitle: Missing table_id for ${table} or mask name`);
    return "Title not available";
  }
  
  return bestLanguage(instanceData.l10n[`mask.${tableId}.${mask.name}.splitter.${String(options.splitterIdx)}`], [lang]);
}

export function hasContent(data, table, fields, output, easydbInstanceDataStoreParam = null) {
  for (let field of fields) {
    if (("output" in field) && (field.output[output] === false)) {
      continue;
    }
    if (((field.kind === 'field') || (field.kind === 'link')) && (hasField(data, table, field, easydbInstanceDataStoreParam))) {
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

export function standardHasAsset(data) {
  return "eas" in data._standard
}

const image_preference = ["preview", "small", "huge", "full", "original"];

export function selectStandardAsset(data) {
  for (const pref of image_preference) {
    if (pref in data._standard.eas["1"][0].versions) {
      return data._standard.eas["1"][0].versions[pref].url;
    }
  }
}