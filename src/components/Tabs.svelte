<script>
  import { hasContent } from "../lib/easydbHelpers";
  import { Tabs } from "flowbite-svelte";

  export let data;
  export let table;
  export let fields;
</script>

{#if hasContent(data, table, fields) }
  <Tabs class="flex justify-center">
    <slot />
  </Tabs>
{/if}
