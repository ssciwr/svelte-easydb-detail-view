<script>
  import { TabItem } from "flowbite-svelte";
  import { hasContent, splitterTitle } from "../lib/easydbHelpers";
  import { getContext } from "svelte";

  export let data;
  export let fields;
  export let table;

  const lang = getContext("l10n");
  const options = JSON.parse(fields[0].options);
</script>

{#if hasContent(data, table, fields) }
  <TabItem open title={splitterTitle(data, table, options, lang)}>
    <slot />
  </TabItem>
{/if}
