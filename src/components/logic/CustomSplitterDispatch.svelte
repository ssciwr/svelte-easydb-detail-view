<script>
  export let field;
  export let data;
  export let table;

  import UbhdIIIFMaskSplitter from "../splitter/UBHDIIIFMaskSplitter.svelte";
  import UbhdObjMaskSplitter from "../splitter/UBHDObjMaskSplitter.svelte";

  import NotImplemented from "../utils/NotImplemented.svelte";

  const componentMapping = {
    "ubhd-obj-mask-splitter": UbhdObjMaskSplitter,
    "ubhd-iiif-mask-splitter": UbhdIIIFMaskSplitter,
  };

  const options = JSON.parse(field.options);
</script>

{#if options.__customSplitterType in componentMapping}
  <svelte:component this={componentMapping[options.__customSplitterType]} field={field} data={data} table={table} />
{:else}
  <NotImplemented message="Custom splitter of type '{options.__customSplitterType}' not implemented" />
{/if}
