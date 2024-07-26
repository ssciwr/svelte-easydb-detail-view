<script>
  import { viewerPanelStateStore } from "../../lib/stores";

  export let data;
  export let table;
  export let fields;

  import AssetViewer from "./AssetViewer.svelte";
  import HierarchyViewer from "./HierarchyViewer.svelte";
</script>

{#if $viewerPanelStateStore === "asset"}
  <AssetViewer data={data} fields={fields} table={table} />
{:else if $viewerPanelStateStore === "hierarchy"}
  <HierarchyViewer data={data} />
{:else if $viewerPanelStateStore === "map"}
  My Map
{/if}