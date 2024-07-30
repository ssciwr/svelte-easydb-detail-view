<script>
  import { easydb_api_object } from "../lib/apiaccess";
  import { pregen_instance } from "../lib/easydbPregen";
  import { maskObj } from "../lib/easydbHelpers";
  import { appLanguageStore, dataLanguagesStore, easydbInstanceStore, easydbInstanceDataPromiseStore, uuidStore } from "../lib/stores";

  import RecursiveEasyDbDetailView from "./logic/RecursiveEasyDBDetailView.svelte";
  import TitleDisplay from "./logic/TitleDisplay.svelte";
  import ViewerPanel from "./logic/ViewerPanel.svelte";
  import Waiting from "./utils/Waiting.svelte";
  import DetailControls from "./logic/DetailControls.svelte";

  export let uuid = "";
  export let appLanguage = "de-DE";
  export let dataLanguages = ["de-DE", "en-US"];
  export let easydbInstance = pregen_instance;
  export let mask = "";

  $: appLanguageStore.set(appLanguage);
  $: dataLanguagesStore.set(dataLanguages);
  $: easydbInstanceStore.set(easydbInstance);
  $: uuidStore.set([uuid]);
</script>

{#await $easydbInstanceDataPromiseStore }
  <Waiting>
    Accessing the EasyDB instance...
  </Waiting>
{:then}
  {#await easydb_api_object($uuidStore.at(-1), mask) }
    <Waiting>
      Waiting for API response...
    </Waiting>
  {:then data }
    <DetailControls data={data}/>
    <ViewerPanel fields={maskObj(data).fields} data={data} table={maskObj(data).table_name_hint}/>
    <TitleDisplay data={data} table={maskObj(data).table_name_hint}/>
    <RecursiveEasyDbDetailView fields={maskObj(data).fields} data={data} table={maskObj(data).table_name_hint}/>
  {/await}
{/await}
