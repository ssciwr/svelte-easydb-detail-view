<script>
  import { easydb_api_object } from "../../lib/apiaccess";
  import { maskObj } from "../../lib/easydbHelpers";
  import { getContext } from 'svelte';
  
  // Get stores from context
  const stores = getContext('stores');
  const { currentSystemId, easydbInstanceDataStore } = stores;

  // Debug function to log data when it arrives
  function debugAPIResponse(data) {
    console.log("🔍 [DEBUG] API Response received:", data);
    console.log("🔍 [DEBUG] Data mask:", data?._mask);
    console.log("🔍 [DEBUG] Data keys:", data ? Object.keys(data) : 'no data');
    console.log("🔍 [DEBUG] EasyDB Instance Data Store:", $easydbInstanceDataStore);
    console.log("🔍 [DEBUG] Available schemas:", $easydbInstanceDataStore?.schemas ? Object.keys($easydbInstanceDataStore.schemas) : 'no schemas');
    console.log("🔍 [DEBUG] Available masks:", $easydbInstanceDataStore?.masks ? Object.keys($easydbInstanceDataStore.masks) : 'no masks');
    
    const maskResult = maskObj(data, easydbInstanceDataStore);
    console.log("🔍 [DEBUG] maskObj result:", maskResult);
    console.log("🔍 [DEBUG] maskObj fields:", maskResult?.fields?.length || 'no fields');
    console.log("🔍 [DEBUG] maskObj table_name_hint:", maskResult?.table_name_hint);
  }

  import RecursiveEasyDbDetailView from "./RecursiveEasyDBDetailView.svelte";
  import TitleDisplay from "./TitleDisplay.svelte";
  import ViewerPanel from "./ViewerPanel.svelte";
  import Waiting from "../utils/Waiting.svelte";
  import DetailControls from "./DetailControls.svelte";

  export let systemid;
  export let mask = "";
  
  // Reactive statement to debug API responses without rendering
  let apiData = null;
  $: if (apiData) {
    debugAPIResponse(apiData);
  }
</script>

{#await easydb_api_object(systemid ? systemid : $currentSystemId, mask, stores) }
  <Waiting>
    Waiting for API response...
  </Waiting>
{:then data }
  {apiData = data, ''}
  
  <!-- Wait for real schemas to be loaded, not pregen placeholder data -->
  {#if $easydbInstanceDataStore?.instance === 'https://example.easydb.com' || !$easydbInstanceDataStore?.schemas || !$easydbInstanceDataStore?.schemas['objekte'] || !$easydbInstanceDataStore?.masks || !$easydbInstanceDataStore?.masks[data._mask]}
    <Waiting>
      Loading real schema and mask data...
    </Waiting>
  {:else}
    <DetailControls data={data}/>
    <ViewerPanel fields={maskObj(data, easydbInstanceDataStore).fields} data={data} table={maskObj(data, easydbInstanceDataStore).table_name_hint}/>
    <TitleDisplay data={data} table={maskObj(data, easydbInstanceDataStore).table_name_hint}/>
    <div class="space-y-2">
      <RecursiveEasyDbDetailView fields={maskObj(data, easydbInstanceDataStore).fields} data={data} table={maskObj(data, easydbInstanceDataStore).table_name_hint}/>
    </div>
  {/if}
{/await}
