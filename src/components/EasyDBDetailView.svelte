<svelte:options customElement='easydb-detail-view' />

<script>
  import '../app.pcss';

  import { pregen_instance } from "../lib/easydbPregen";
  import { appLanguageStore, dataLanguagesStore, easydbInstanceStore, easydbInstanceDataStore, systemidStore, userGivenMasksToRenderStore, userTokenStore } from "../lib/stores";

  import DetailViewImpl from "./logic/DetailViewImpl.svelte";
  import Waiting from "./utils/Waiting.svelte";

  export let systemid = "";
  export let appLanguage = "de-DE";
  export let dataLanguages = ["de-DE", "en-US"];
  export let easydbInstance = pregen_instance;
  export let mask = "";
  export let masksToRender = [];
  export let token = "";

  $: appLanguageStore.set(appLanguage);
  $: dataLanguagesStore.set(dataLanguages);
  $: easydbInstanceStore.set(easydbInstance);
  $: userGivenMasksToRenderStore.set(masksToRender)
  $: systemidStore.set([systemid]);
  $: userTokenStore.set(token);
</script>

{#if !$easydbInstanceDataStore || ($easydbInstanceDataStore.instance !== easydbInstance) }
  <Waiting>
    Accessing the EasyDB instance...
  </Waiting>
{:else}
  <DetailViewImpl mask={mask}/>
{/if}