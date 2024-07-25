<script>
  import { hasContent } from "../../lib/easydbHelpers";
  import { Tabs } from "flowbite-svelte";

  export let data;
  export let table;
  export let fields;
  export let output;
</script>

{#if hasContent(data, table, fields, output) }
  <Tabs class="flex justify-center">
    <slot />
  </Tabs>
{/if}
