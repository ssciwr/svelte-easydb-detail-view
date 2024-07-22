<script>
  export let field;
  export let data;
  export let table;

  import NotImplemented from "../utils/NotImplemented.svelte";

  const componentMapping = {
  };

  const options = JSON.parse(field.options);
</script>

{#if options.__customSplitterType in componentMapping}
  <svelte:component this={componentMapping[options.__customSplitterType]} field={field} data={data} table={table} />
{:else}
  <NotImplemented message="Custom splitter of type '{options.__customSplitterType}' not implemented" />
{/if}
