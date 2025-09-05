<script>
  import { hasContent } from "../../lib/easydbHelpers";
  import { Tabs } from "flowbite-svelte";
  import { getContext } from 'svelte';

  // Get stores from context
  const stores = getContext('stores');
  const { easydbInstanceDataStore } = stores;

  export let data;
  export let table;
  export let fields;
  export let output;
</script>

{#if hasContent(data, table, fields, output, easydbInstanceDataStore) }
  <Tabs class="flex justify-center">
    <slot />
  </Tabs>
{/if}
