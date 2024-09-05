<svelte:options customElement={{
  tag: 'easydb-detail-view',
  shadow: 'none'
  }}
/>

<script>
  import { pregen_instance } from "../lib/easydbPregen";
  import { appLanguageStore, dataLanguagesStore, easydbInstanceStore, easydbInstanceDataPromiseStore, userGivenMasksToRenderStore, uuidStore } from "../lib/stores";

  import DetailViewImpl from "./logic/DetailViewImpl.svelte";
  import Waiting from "./utils/Waiting.svelte";

  export let uuid = "";
  export let appLanguage = "de-DE";
  export let dataLanguages = ["de-DE", "en-US"];
  export let easydbInstance = pregen_instance;
  export let mask = "";
  export let masksToRender = [];

  $: appLanguageStore.set(appLanguage);
  $: dataLanguagesStore.set(dataLanguages);
  $: easydbInstanceStore.set(easydbInstance);
  $: userGivenMasksToRenderStore.set(masksToRender)
  $: uuidStore.set([uuid]);
</script>

{#await $easydbInstanceDataPromiseStore }
  <Waiting>
    Accessing the EasyDB instance...
  </Waiting>
{:then}
  <DetailViewImpl mask={mask}/>
{/await}
