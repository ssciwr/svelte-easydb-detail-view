import { get } from 'svelte/store';
import { easydbInstanceStore } from './stores';

export async function easydb_api_object(uuid, mask) {
  if (!uuid) {
    return {}
  }

  let url = `${get(easydbInstanceStore)}/api/objects/uuid/${uuid}`;
  if (mask !== '') {
    url = `${url}/mask/${mask}`;
  }

  // Fetch the schema data for this instance
  const response = await fetch(url);
  if(response.status != 200) {
    throw new Error(`Could not fetch the data for uuid: ${uuid}`);
  }
  const response_json = await response.json()
  return response_json;
}