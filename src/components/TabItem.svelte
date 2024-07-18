<script>
  import { TabItem } from "flowbite-svelte";
  import { hasContent, splitterTitle } from "../lib/easydbHelpers";
  import { appLanguageStore } from "../lib/stores";

  export let data;
  export let fields;
  export let table;
  export let open;

  const options = JSON.parse(fields[0].options);
</script>

{#if hasContent(data, table, fields) }
  <TabItem open={open} title={splitterTitle(data, table, options, $appLanguageStore)}>
    <slot />
  </TabItem>
{/if}
