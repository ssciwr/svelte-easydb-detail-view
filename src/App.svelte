<script>
  import { Button, Heading, Input, Label, MultiSelect, Select } from "flowbite-svelte";
  import { easydbInstanceStore, easydbInstanceDataStore, easydbInstanceDataPromiseStore, easydbTokenPromiseStore, userTokenStore, uuidStore, viewerPanelStateStore } from "./lib/stores";
  import EasyDbDetailView from "./components/EasyDBDetailView.svelte";

  let uuid = "859e2318-32f6-4013-8468-ef8cec0b581b";
  let mask = "";
  let instance = "https://heidicon.ub.uni-heidelberg.de";
  let token = "";

  let languages = [
    { value: 'de-DE', name: 'Deutsch'},
    { value: 'en-US', name: 'English'},
  ];
  let selected_app_language = 'de-DE';
  let selected_data_languages = ['de-DE', 'en-US'];

  $: userTokenStore.set(token);

  function dumpStores() {
    console.log("easydbInstanceStore: ", $easydbInstanceStore);
    console.log("easydbInstanceDataStore: ", $easydbInstanceDataStore);
    console.log("easydbInstanceDataPromiseStore: ", $easydbInstanceDataPromiseStore);
    console.log("easydbTokenPromiseStore: ", $easydbTokenPromiseStore);
    console.log("userTokenStore: ", $userTokenStore);
    console.log("uuidStore: ", $uuidStore);
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
          UUID of EasyDB record
        </Label>
        <Input type="text" bind:value={uuid} size="lg" class="w-full"></Input>
      </div>
      <div class="space-y-2 p-4">
        <Label>
          Some pre-selected UUIDs:
        </Label>
        <Button class="w-full" on:click={
          () => { 
            uuid = "6deddff8-c600-447e-8892-3359c3516a94";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          6deddff8-c600-447e-8892-3359c3516a94@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            uuid = "859e2318-32f6-4013-8468-ef8cec0b581b";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          859e2318-32f6-4013-8468-ef8cec0b581b@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => { 
            uuid = "acbc91a3-2c1f-49be-b937-9d78de838640";
            instance = "https://heidicon.ub.uni-heidelberg.de"; 
          }
        }>
          acbc91a3-2c1f-49be-b937-9d78de838640@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            uuid = "2ee862d1-180d-4222-bbbf-41a8ec06e41a";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          2ee862d1-180d-4222-bbbf-41a8ec06e41a@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            uuid = "a3f6109f-feb4-45f8-8e76-c4466efd0d20";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          a3f6109f-feb4-45f8-8e76-c4466efd0d20@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            uuid = "bb7c84ae-4796-4c20-8df0-a4c5c49a7ac6";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          bb7c84ae-4796-4c20-8df0-a4c5c49a7ac6@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            uuid = "1fde05f5-7767-448f-a104-4f4af9d8f9ed";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          1fde05f5-7767-448f-a104-4f4af9d8f9ed@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            uuid = "e95dcb74-77f6-4794-b468-506da8b7a3a1";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          e95dcb74-77f6-4794-b468-506da8b7a3a1@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            uuid = "a1b154b0-2c89-4317-8bac-2a7e684740b8";
            instance = "https://heidicon.ub.uni-heidelberg.de";
          }
        }>
          a1b154b0-2c89-4317-8bac-2a7e684740b8@HeidICON
        </Button>
        <Button class="w-full" on:click={
          () => {
            uuid = "bc679b8c-e8af-48d3-9339-5260c20c3e77";
            instance = "https://dmmp.ub.uni-heidelberg.de";
          }
        }>
          bc679b8c-e8af-48d3-9339-5260c20c3e77@DMMP
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
      <div class="space-y-2 p-4">
        <Button on:click={dumpStores} class="w-full">Dump all stores to the console (Debugging)</Button>
      </div>
    </div>
    <div class="w-1/2 p-4 border border-gray-300">
      <EasyDbDetailView uuid={uuid} appLanguage={selected_app_language} dataLanguages={selected_data_languages} easydbInstance={instance} mask={mask}/>
    </div>
  </div>
</main>
