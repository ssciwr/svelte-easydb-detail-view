<script>
  import { easydb_api_object } from "../lib/apiaccess";
  import { pregen_instance } from "../lib/easydbPregen";
  import { maskObj } from "../lib/easydbHelpers";
  import { appLanguageStore, dataLanguagesStore, easydbInstanceStore, easydbInstanceDataPromiseStore, uuidStore } from "../lib/stores";

  import { A } from "flowbite-svelte";
  import { ArrowLeftOutline } from "flowbite-svelte-icons";

  import AssetViewer from "./logic/AssetViewer.svelte";
  import RecursiveEasyDbDetailView from "./logic/RecursiveEasyDBDetailView.svelte";
  import Waiting from "./utils/Waiting.svelte";

  export let uuid = "";
  export let appLanguage = "de-DE";
  export let dataLanguages = ["de-DE", "en-US"];
  export let easydbInstance = pregen_instance;
  export let mask = "";

  $: appLanguageStore.set(appLanguage);
  $: dataLanguagesStore.set(dataLanguages);
  $: easydbInstanceStore.set(easydbInstance);
  $: uuidStore.set([uuid]);

  const l10n = {
    "returntext": {
      "de-DE": "Zurück zu Objekt ",
      "en-US": "Return to object ",
    },
  };
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
    {#if $uuidStore.length > 1}
      <A on:click={() => { uuidStore.update((existing) => existing.slice(0, -1)); }}>
        <ArrowLeftOutline class="inline-block w-6 h-6"/>
        {l10n.returntext[$appLanguageStore]}{$uuidStore.at(-2)}
      </A>
    {/if}
    <AssetViewer fields={maskObj(data).fields} data={data} table={maskObj(data).table_name_hint}/>
    <RecursiveEasyDbDetailView fields={maskObj(data).fields} data={data} table={maskObj(data).table_name_hint}/>
  {/await}
{/await}
