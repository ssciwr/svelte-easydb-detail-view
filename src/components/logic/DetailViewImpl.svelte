<script>
  import { easydb_api_object } from "../../lib/apiaccess";
  import { maskObj } from "../../lib/easydbHelpers";
  import { getContext } from 'svelte';
  
  // Get stores from context
  const stores = getContext('stores');
  const { currentSystemId } = stores;

  import RecursiveEasyDbDetailView from "./RecursiveEasyDBDetailView.svelte";
  import TitleDisplay from "./TitleDisplay.svelte";
  import ViewerPanel from "./ViewerPanel.svelte";
  import Waiting from "../utils/Waiting.svelte";
  import DetailControls from "./DetailControls.svelte";

  export let systemid;
  export let mask = "";
</script>

{#await easydb_api_object(systemid ? systemid : $currentSystemId, mask) }
  <Waiting>
    Waiting for API response...
  </Waiting>
{:then data }
  <DetailControls data={data}/>
  <ViewerPanel fields={maskObj(data).fields} data={data} table={maskObj(data).table_name_hint}/>
  <TitleDisplay data={data} table={maskObj(data).table_name_hint}/>
  <div class="space-y-2">
    <RecursiveEasyDbDetailView fields={maskObj(data).fields} data={data} table={maskObj(data).table_name_hint}/>
  </div>
{/await}
