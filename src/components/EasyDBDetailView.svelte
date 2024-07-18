<script>
  import { easydb_api_object } from "../lib/apiaccess";
  import { pregen_instance } from "../lib/easydbPregen";
  import { maskObj } from "../lib/easydbHelpers";
  import { setContext } from "svelte";
  import { appLanguageStore, easydbInstanceStore, easydbDataPromiseStore } from "../lib/stores";

  import RecursiveEasyDbDetailView from "./RecursiveEasyDBDetailView.svelte";

  export let uuid = "";
  export let appLanguage = "de-DE";
  export let easydb_instance = pregen_instance;

  $: appLanguageStore.set(appLanguage);
  $: easydbInstanceStore.set(easydb_instance);

  setContext("appLanguage", appLanguageStore);
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
