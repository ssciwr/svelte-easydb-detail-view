<script>
  import { viewerPanelStateStore } from "../../lib/stores";

  export let data;
  export let table;
  export let fields;

  import AssetViewer from "./AssetViewer.svelte";
  import HierarchyViewer from "./HierarchyViewer.svelte";

  import "./hierarchy.css";
</script>

{#if $viewerPanelStateStore === "asset"}
  <AssetViewer data={data} fields={fields} table={table} />
{:else if $viewerPanelStateStore === "hierarchy"}
  <div class="hierarchy-viewer">
    <HierarchyViewer openids={data._path.map(entry => entry[table]._id)} table={table} root={data._path[0]}/>
  </div>
{:else if $viewerPanelStateStore === "map"}
  My Map
{/if}