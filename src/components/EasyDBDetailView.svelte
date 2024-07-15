<script>
  import { easydb_api_object } from "../lib/apiaccess";
  import { maskObj } from "../lib/easydbHelpers";
  import { setContext } from "svelte";
  import { l10nStore } from "../lib/stores";

  import RecursiveEasyDbDetailView from "./RecursiveEasyDBDetailView.svelte";

  export let uuid = "";
  export let l10n = "de-DE";

  $: l10nStore.set(l10n);
  setContext("l10n", l10nStore);
</script>

{#await easydb_api_object(uuid) }
  Waiting for API response...
{:then data }
  <RecursiveEasyDbDetailView fields={maskObj(data).fields} data={data} table={maskObj(data).table_name_hint}/>
{/await}
