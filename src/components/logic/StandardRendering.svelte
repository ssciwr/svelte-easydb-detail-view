<script>
  import { bestLanguage } from "../../lib/l10n";
  import { dataLanguagesStore } from "../../lib/stores";

  export let data;

  // What is the highest possible key in the _standard object?
  // Do they have an actual meaning?
  const levels = ["1", "2", "3", "4", "5"];
</script>

{#each levels as level}
  {#if data._standard[level]}
    <div class="easydb-standard-{level}">
      {bestLanguage(data._standard[level].text, $dataLanguagesStore)}
    </div>
  {/if}
{/each}