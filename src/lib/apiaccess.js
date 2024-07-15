import { get } from 'svelte/store';
import { easydbInstanceStore } from './stores';

export async function easydb_api_object(uuid) {
  if (!uuid) {
    return {}
  }

  // Fetch the schema data for this instance
  const response = await fetch(`${get(easydbInstanceStore)}/api/objects/uuid/${uuid}`);
  if(response.status != 200) {
    throw new Error(`Could not fetch the data for uuid: ${uuid}`);
  }
  const response_json = await response.json()
  return response_json;
}