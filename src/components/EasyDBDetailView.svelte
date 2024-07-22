<script>
  import { easydb_api_object } from "../lib/apiaccess";
  import { pregen_instance } from "../lib/easydbPregen";
  import { maskObj } from "../lib/easydbHelpers";
  import { appLanguageStore, dataLanguagesStore, easydbInstanceStore, easydbInstanceDataPromiseStore, uuidStore } from "../lib/stores";

  import RecursiveEasyDbDetailView from "./logic/RecursiveEasyDBDetailView.svelte";

  export let uuid = "";
  export let appLanguage = "de-DE";
  export let dataLanguages = ["de-DE", "en-US"];
  export let easydbInstance = pregen_instance;
  export let mask = "";

  $: appLanguageStore.set(appLanguage);
  $: dataLanguagesStore.set(dataLanguages);
  $: easydbInstanceStore.set(easydbInstance);
  $: uuidStore.update((existing) => [...existing, uuid]);
</script>

{#await $easydbInstanceDataPromiseStore }
  Accessing the EasyDB instance...
{:then}
  {#await easydb_api_object($uuidStore.at(-1), mask) }
    Waiting for API response...
  {:then data }
    <RecursiveEasyDbDetailView fields={maskObj(data).fields} data={data} table={maskObj(data).table_name_hint}/>
  {/await}
{/await}
