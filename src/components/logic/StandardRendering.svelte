<script>
  import { bestLanguage } from "../../lib/l10n";
  import { getContext } from 'svelte';
  import { selectStandardAsset, standardHasAsset } from "../../lib/easydbHelpers";

  import { Img } from "flowbite-svelte";

  // Get stores from context
  const stores = getContext('stores');
  const { dataLanguagesStore } = stores;

  export let data;
  export let asset = false;

  // What is the highest possible key in the _standard object?
  // Do they have an actual meaning?
  const levels = ["1", "2", "3", "4", "5"];
</script>

{#if asset && standardHasAsset(data)}
  <Img src={selectStandardAsset(data)} class="h-16 pr-2" />
{/if}
{#each levels as level}
  {#if data._standard[level]}
    <div class="easydb-standard-{level}">
      {bestLanguage(data._standard[level].text, $dataLanguagesStore)}
    </div>
  {/if}
{/each}