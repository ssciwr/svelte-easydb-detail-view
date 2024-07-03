<script>
  import { TabItem } from "flowbite-svelte";
  import { hasContent, splitterTitle } from "../lib/easydbHelpers";
  import { lang } from "../lib/l10n";

  export let data;
  export let fields;
  export let table;

  const options = JSON.parse(fields[0].options);
</script>

{#if hasContent(data, table, fields) }
  <TabItem title={splitterTitle(data, table, options, lang)}>
    <slot />
  </TabItem>
{/if}
