<script>
  import { appLanguageStore, pushUUID } from "../../lib/stores";

  import { A, P } from "flowbite-svelte";
  import { ArrowDownOutline, ArrowRightOutline } from "flowbite-svelte-icons";

  export let data;
  export let table;
  export let field;

  const options = JSON.parse(field.options);

  const l10n = {
    "hinweistext1": {
      "de-DE": "Wechsel zu ",
      "en-US": "Change to "
    },
    "hinweistext2": {
      "de-DE": " ",
      "en-US": " "
    },
    "aufnahme": {
      "de-DE": "Aufnahme",
      "en-US": "Ressource"
    },
    "gegenstand": {
      "de-DE": "Gegenstand/Werk",
      "en-US": "Item/Work"
    },
  };
</script>

<P class="text-right ubhd-obj-mask-splitter-text">
  <A on:click={() => { pushUUID(data._uuid); }}>
    {l10n.hinweistext1[$appLanguageStore]}
    {l10n[options.label][$appLanguageStore]}
    {l10n.hinweistext2[$appLanguageStore]}
    {#if options.direction === "up"}
      <ArrowUpOutline class="inline-block w-6 h-6" />
    {/if}
    {#if options.direction === "right"}
      <ArrowRightOutline class="inline-block w-6 h-6" />
    {/if}
    {#if options.direction === "down"}
      <ArrowDownOutline class="inline-block w-6 h-6" />
    {/if}
  </A>
</P>
<slot />