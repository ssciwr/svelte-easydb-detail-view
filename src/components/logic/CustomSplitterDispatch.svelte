<script>
  import { componentMapping } from "../splitter/splitterMapping.js";

  export let field;
  export let data;
  export let table;

  import NotImplemented from "../utils/NotImplemented.svelte";

  const options = JSON.parse(field.options);
</script>

{#if options.__customSplitterType in componentMapping}
  <svelte:component this={componentMapping[options.__customSplitterType]} field={field} data={data} table={table}>
    <slot />
  </svelte:component>
{:else}
  <NotImplemented message="Custom splitter of type '{options.__customSplitterType}' not implemented" />
{/if}
