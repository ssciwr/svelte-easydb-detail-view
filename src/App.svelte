<script>
  import { Button, Label, Input, Select } from "flowbite-svelte";
  import EasyDbDetailView from "./components/EasyDBDetailView.svelte";

  let uuid = "859e2318-32f6-4013-8468-ef8cec0b581b";

  let languages = [
    { value: 'de-DE', name: 'Deutsch'},
    { value: 'en-US', name: 'English'},
  ];
  let selected_language = 'de-DE';
</script>

<main class="container mx-auto">
  <div class="flex justify-between">
    <div class="w-1/2">
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
        <Button class="w-full" on:click={() => { uuid = "6deddff8-c600-447e-8892-3359c3516a94"; }}>
          6deddff8-c600-447e-8892-3359c3516a94
        </Button>
        <Button class="w-full" on:click={() => { uuid = "859e2318-32f6-4013-8468-ef8cec0b581b"; }}>
          859e2318-32f6-4013-8468-ef8cec0b581b
        </Button>
        <Button class="w-full" on:click={() => { uuid = "acbc91a3-2c1f-49be-b937-9d78de838640"; }}>
          acbc91a3-2c1f-49be-b937-9d78de838640
        </Button>
        <Button class="w-full" on:click={() => { uuid = "ade6b39c-86c0-40ff-98f0-a47fb8ec669d"; }}>
          ade6b39c-86c0-40ff-98f0-a47fb8ec669d
        </Button>
      </div>
      <div class="space-y-2 p-4">
        <Label>
          Language:
        </Label>
        <Select class="w-full" items={languages} bind:value={selected_language} />
      </div>
    </div>
    <div class="w-1/2 p-4 border border-gray-300">
      <EasyDbDetailView uuid={uuid} l10n={selected_language} />
    </div>
  </div>
</main>
