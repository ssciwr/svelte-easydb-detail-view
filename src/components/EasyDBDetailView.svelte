<script>
  import { easydb_api_object } from "../lib/apiaccess";
  import { pregen_instance } from "../lib/easydbPregen";
  import { maskObj } from "../lib/easydbHelpers";
  import { appLanguageStore, dataLanguagesStore, easydbInstanceStore, easydbDataPromiseStore } from "../lib/stores";

  import RecursiveEasyDbDetailView from "./logic/RecursiveEasyDBDetailView.svelte";

  export let uuid = "";
  export let appLanguage = "de-DE";
  export let dataLanguages = ["de-DE", "en-US"];
  export let easydbInstance = pregen_instance;
  export let mask = "";

  $: appLanguageStore.set(appLanguage);
  $: dataLanguagesStore.set(dataLanguages);
  $: easydbInstanceStore.set(easydbInstance);
</script>

{#await $easydbDataPromiseStore }
  Accessing the EasyDB instance...
{:then}
  {#await easydb_api_object(uuid, mask) }
    Waiting for API response...
  {:then data }
    <RecursiveEasyDbDetailView fields={maskObj(data).fields} data={data} table={maskObj(data).table_name_hint}/>
  {/await}
{/await}
