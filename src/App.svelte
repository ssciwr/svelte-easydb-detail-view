<script>
  import { Button, Heading, Input, Label, MultiSelect, Select } from "flowbite-svelte";
  import { appLanguageStore, easydbInstanceStore, easydbInstanceDataStore, easydbInstanceDataPromiseStore, easydbTokenPromiseStore, masksToRenderStore, systemidStore, userTokenStore, viewerPanelStateStore } from "./lib/stores";
  import EasyDbDetailView from "./components/EasyDBDetailView.svelte";

  let systemid = "906249";
  let mask = "";
  let instance = "https://heidicon.ub.uni-heidelberg.de";
  let token = "";

  let languages = [
    { value: 'de-DE', name: 'Deutsch'},
    { value: 'en-US', name: 'English'},
  ];
  let selected_app_language = 'de-DE';
  let selected_data_languages = ['de-DE', 'en-US'];

  function getAvailableMasks() {
    return Array.from(Object.keys($easydbInstanceDataStore.masks), (m) => { return { value: m, name: m }});
  }
  let selected_masks = [];

  $: userTokenStore.set(token);

  function dumpStores() {
    console.log("appLanguageStore: ", $appLanguageStore);
    console.log("easydbInstanceStore: ", $easydbInstanceStore);
    console.log("easydbInstanceDataStore: ", $easydbInstanceDataStore);
    console.log("easydbInstanceDataPromiseStore: ", $easydbInstanceDataPromiseStore);
    console.log("easydbTokenPromiseStore: ", $easydbTokenPromiseStore);
    console.log("masksToRenderStore: ", $masksToRenderStore);
    console.log("userTokenStore: ", $userTokenStore);
    console.log("systemidStore: ", $systemidStore);
    console.log("viewerPanelStateStore: ", $viewerPanelStateStore);
  }
</script>

<main class="container mx-auto">
  <div class="flex justify-between">
    <div class="w-1/2">
      <Heading class="p-4">Svelte EasyDB DetailView Demo</Heading>
      <p class="p-4">
        This demo showcases the EasyDBDetailView Svelte component. The controls
        on the left hand side are purely for demonstration purposes and merely
        explain what can be interactively controlled from the JavaScript side.
        On the right hand side, we see the detail view component result.
      </p>
      <div class="space-y-2 p-4">
        <Label>
          URL of the EasyDB instance
        </Label>
        <Input type="text" bind:value={instance} size="lg" class="w-full"></Input>
      </div>
      <div class="space-y-2 p-4">
        <Label>
          EasyDB Token (only give if your instance requires authenticated access).
        </Label>
        <Input type="text" bind:value={token} size="lg" class="w-full"></Input>
      </div>
      <div class="space-y-2 p-4">
        <Label>
          System ID of EasyDB record
        </Label>
        <Input type="text" bind:value={systemid} size="lg" class="w-full"></Input>
      </div>
      <div class="space-y-2 p-4">
        <Label>
          Some pre-selected System IDs:
        </Label>
        <Button class="w-full" on:click={
          () => { 
            systemid = "23823812";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          23823812@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            systemid = "906249";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          906249@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => { 
            systemid = "360156";
            instance = "https://heidicon.ub.uni-heidelberg.de"; 
          }
        }>
          360156@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            systemid = "23817051";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          23817051@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            systemid = "23824557";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          23824557@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            systemid = "1748947";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          1748947@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            systemid = "1706516";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          1706516@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            systemid = "1019633";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          1019633@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            systemid = "1655171";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          1655171@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            systemid = "6493";
            instance = "https://dmmp.ub.uni-heidelberg.de";
          }
        }>
          6493@DMMP
        </Button>
      </div>
      <div class="space-y-2 p-4">
        <Label>
          Application Language:
        </Label>
        <Select class="w-full" items={languages} bind:value={selected_app_language} />
      </div>
      <div class="space-y-2 p-4">
        <Label>
          Data Languages:
        </Label>
        <MultiSelect items={languages} bind:value={selected_data_languages} />
      </div>
      <div class="space-y-2 p-4">
        <Label>
          Mask (leave empty for default mask):
        </Label>
        <Input bind:value={mask} />
      </div>

      {#await $easydbInstanceDataPromiseStore }
        Waiting for instance data...
      {:then}
        <div class="space-y-2 p-4">
          <Label>
            Masks to render (objects using these masks will render in the detail view, all others as popovers):
          </Label>
          <MultiSelect items={getAvailableMasks()} bind:value={selected_masks}/>
        </div>
      {/await}
      <div class="space-y-2 p-4">
        <Button on:click={dumpStores} class="w-full">Dump all stores to the console (Debugging)</Button>
      </div>
    </div>
    <div class="w-1/2 p-4 border border-gray-300">
      <EasyDbDetailView systemid={systemid} appLanguage={selected_app_language} dataLanguages={selected_data_languages} easydbInstance={instance} mask={mask} masksToRender={selected_masks} />
    </div>
  </div>
</main>
