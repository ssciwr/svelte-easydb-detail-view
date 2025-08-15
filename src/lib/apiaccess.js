import { get } from 'svelte/store';
import { easydbInstanceStore, easydbTokenPromiseStore, userTokenStore } from './stores';

export async function easydb_api_object(systemid, mask, stores = null) {
  if (!systemid) {
    return {}
  }

  // Use isolated stores if provided, otherwise fall back to global stores
  const instanceStore = stores?.easydbInstanceStore || easydbInstanceStore;
  const tokenStore = stores?.userTokenStore || userTokenStore;
  
  const instance = get(instanceStore);
  if (!instance || instance === null) {
    throw new Error(`EasyDB instance is not set or is null. Cannot fetch data for systemid: ${systemid}`);
  }

  let url = `${instance}/api/objects/id/${systemid}`;
  if (mask !== '') {
    url = `${url}/mask/${mask}`;
  }
  if (get(tokenStore) !== "") {
    url = url + '?' + new URLSearchParams({token: get(tokenStore)});
  }

  // Fetch the schema data for this instance
  const response = await fetch(url);
  if(response.status != 200) {
    throw new Error(`Could not fetch the data for systemid: ${systemid}`);
  }
  const response_json = await response.json();
  return response_json;
}

export async function easydbChildrenObject(id, table, stores = null) {
  // Use isolated stores if provided, otherwise fall back to global stores
  const instanceStore = stores?.easydbInstanceStore || easydbInstanceStore;
  const tokenStore = stores?.userTokenStore || userTokenStore;
  const tokenPromiseStore = stores?.easydbTokenPromiseStore || easydbTokenPromiseStore;
  
  const instance = get(instanceStore);
  if (!instance || instance === null) {
    throw new Error(`EasyDB instance is not set or is null. Cannot fetch children for table: ${table}`);
  }

  let token = await get(tokenStore);
  if (token === "") {
    token = await get(tokenPromiseStore);
  }

  const response = await fetch(`${instance}/api/search?` +
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