<script>
  import { fieldData, hasField, standardHasAsset, selectStandardAsset } from "../../lib/easydbHelpers";
  import { dataLanguagesStore, pushUUID, masksToRenderStore } from "../../lib/stores";
  import { A, Breadcrumb, BreadcrumbItem, Card, P, Popover } from "flowbite-svelte";

  import FieldLabel from "./FieldLabel.svelte";

  export let field;
  export let data;
  export let table;
  export let condensed;

  const fdata = fieldData(data, table, field);

  // Here, we load the component lazily
  let detailViewComponent;

  function requiresPopover() {
    console.log($masksToRenderStore);
    console.log(fdata._mask);
    console.log($masksToRenderStore.includes(fdata._mask));
    if (!$masksToRenderStore) {
      return false;
    }
    return !($masksToRenderStore.includes(fdata._mask));
  }

  function handleClick() {
    if(!requiresPopover()) {
      pushUUID(fdata._uuid);
    }
    else {
      detailViewComponent = import("../logic/DetailViewImpl.svelte");
    }
  }

  function hasNontrivialPath() {
    if (!("_path" in fdata)) {
      return false;
    }
    if (fdata["_path"].length < 2) {
      return false;
    }
    return true;
  }
</script>

{#if hasField(data, table, field)}
  {#if !condensed}
    <P>
      <FieldLabel table={table} field={field} />
    </P>
  {/if}
  {#if hasNontrivialPath()}
    <Breadcrumb>
      {#each fdata["_path"].slice(0, -1) as pathItem}
        <BreadcrumbItem>
          {pathItem._standard["1"].text[$dataLanguagesStore[0]]}
        </BreadcrumbItem>
      {/each}
    </Breadcrumb>
  {/if}
  {#if standardHasAsset(fdata)}
    <Card class="easydb-link max-w-full h-32" img={selectStandardAsset(fdata)} horizontal>
      <A id="link" on:click={handleClick}>
        {fdata["_standard"]["1"].text[$dataLanguagesStore[0]]}
      </A>
    </Card>
  {:else}
    <span class="easydb-link">
      <A id="link" on:click={handleClick}>
        {fdata["_standard"]["1"].text[$dataLanguagesStore[0]]}
      </A>
    </span>
  {/if}
{/if}
{#if detailViewComponent }
  {#await detailViewComponent then { default : DetailViewImpl }}
    <Popover class="w-[800px] h-[800px] overflow-auto z-20" triggeredBy="#link" trigger="click">
      <DetailViewImpl uuid={fdata._uuid} />
    </Popover>
  {/await}
{/if}