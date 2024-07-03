export async function easydb_api_object(uuid) {
  if (!uuid) {
    return {}
  }

  // Fetch the schema data for this instance
  const response = await fetch('http://localhost:8080/https://heidicon.ub.uni-heidelberg.de/api/objects/uuid/' + uuid);
  if(response.status != 200) {
    throw new Error(`Could not fetch the data for uuid: ${uuid}`);
  }
  const response_json = await response.json()
  return response_json;
}