<script>
  import { easydb_api_object } from "../lib/apiaccess";
  import { pregen_instance } from "../lib/easydbPregen";
  import { maskObj } from "../lib/easydbHelpers";
  import { setContext } from "svelte";
  import { l10nStore, easydbDataStore, easydbInstanceStore, easydbDataPromiseStore } from "../lib/stores";

  import RecursiveEasyDbDetailView from "./RecursiveEasyDBDetailView.svelte";

  export let uuid = "";
  export let l10n = "de-DE";
  export let easydb_instance = pregen_instance;

  $: l10nStore.set(l10n);
  $: easydbInstanceStore.set(easydb_instance);

  setContext("l10n", l10nStore);
</script>

{#await $easydbDataPromiseStore }
  Accessing the EasyDB instance...
{:then}
  {#await easydb_api_object(uuid) }
    Waiting for API response...
  {:then data }
    <RecursiveEasyDbDetailView fields={maskObj(data).fields} data={data} table={maskObj(data).table_name_hint}/>
  {/await}
{/await}
