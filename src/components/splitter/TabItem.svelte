<script>
  import { TabItem } from "flowbite-svelte";
  import { hasContent, splitterTitle } from "../../lib/easydbHelpers";
  import { getContext } from 'svelte';

  // Get stores from context
  const stores = getContext('stores');
  const { appLanguageStore, easydbInstanceDataStore } = stores;

  export let data;
  export let fields;
  export let table;
  export let output;
  export let open;

  const options = JSON.parse(fields[0].options);
</script>

{#if hasContent(data, table, fields, output, easydbInstanceDataStore) }
  <TabItem open={open} title={splitterTitle(data, table, options, $appLanguageStore, easydbInstanceDataStore)}>
    <div class="space-y-4">
      <slot />
    </div>
  </TabItem>
{/if}
