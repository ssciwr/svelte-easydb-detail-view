import { get } from 'svelte/store';
import { easydbInstanceStore, userTokenStore } from './stores';

export async function easydb_api_object(systemid, mask) {
  if (!systemid) {
    return {}
  }

  let url = `${get(easydbInstanceStore)}/api/objects/id/${systemid}`;
  if (mask !== '') {
    url = `${url}/mask/${mask}`;
  }
  if (get(userTokenStore) !== "") {
    url = url + '?' + new URLSearchParams({token: get(userTokenStore)});
  }

  // Fetch the schema data for this instance
  const response = await fetch(url);
  if(response.status != 200) {
    throw new Error(`Could not fetch the data for systemid: ${systemid}`);
  }
  const response_json = await response.json();
  return response_json;
}

export async function easydbChildrenObject(id, table) {
  const token = await get(userTokenStore);
  
  const response = await fetch(`${get(easydbInstanceStore)}/api/search?` +
    new URLSearchParams({
      "token": token,
    }),
    {
      method: 'POST',
      body: JSON.stringify(
        {
          "objecttypes": [
            table
          ],
          "format": "standard",
          "offset": 0,
          "limit": 500,
          "search": [
            {
              "type": "in",
              "bool": "must",
              "fields": [
                `${table}._id_parent`
              ],
              "in": [
                id
              ]
            }
          ]
        }
      ),
    }
  );
  return await response.json();
}