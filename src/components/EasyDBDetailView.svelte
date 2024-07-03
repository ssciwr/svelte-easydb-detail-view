<script>
  import { easydb_api_object } from "../lib/apiaccess";
  import { maskObj } from "../lib/easydbHelpers";
  import { masks } from "../lib/easydb";
  import RecursiveEasyDbDetailView from "./RecursiveEasyDBDetailView.svelte";

  export let uuid = "";
</script>

{#await easydb_api_object(uuid) }
  Waiting for API response...
{:then data }
  <RecursiveEasyDbDetailView fields={maskObj(data).fields} data={data} table={maskObj(data).table_name_hint}/>
{/await}
