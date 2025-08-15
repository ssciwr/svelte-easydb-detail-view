<script>
  import { onMount } from "svelte";

  import { fieldData, hasField, standardHasAsset, selectStandardAsset } from "../../lib/easydbHelpers";
  import { getContext } from 'svelte';
  
  // Get stores and masksToRender from context
  const stores = getContext('stores');
  const masksToRender = getContext('masksToRender');
  const { dataLanguagesStore, pushSystemID, easydbInstanceDataStore } = stores;
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
    if (!masksToRender) {
      return false;
    }
    return !(masksToRender.includes(fdata._mask));
  }

  onMount(() => {
    detailViewComponent = import("../logic/DetailViewImpl.svelte");
  });

  function handleClick() {
    if(!requiresPopover()) {
      pushSystemID(fdata._system_object_id);
    }
  }

  function hasNontrivialPath() {
    // I disable this feature for now, because I have not found out under what circumstances
    // exactly it is supposed to be shown and when not. An example of where the info is present,
    // but not shown is https://heidicon.ub.uni-heidelberg.de/#/detail/23823812, Field
    // "Thema/Bildinhalt (normiert)". Gegenbeispiel ist in DMMP https://dmmp.ub.uni-heidelberg.de/#/detail/6493
    // Field Archiv. Once we find out, just implement the logic and remove the following line.
    return false;

    if (!("_path" in fdata)) {
      return false;
    }
    if (fdata["_path"].length < 2) {
      return false;
    }
    return true;
  }
</script>

{#if hasField(data, table, field, easydbInstanceDataStore)}
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
      <A id="link" href={null} on:click={handleClick}>
        {fdata["_standard"]["1"].text[$dataLanguagesStore[0]]}
      </A>
    </Card>
  {:else}
    <span class="easydb-link">
      <A id="link" href={null} on:click={handleClick}>
        {fdata["_standard"]["1"].text[$dataLanguagesStore[0]]}
      </A>
    </span>
  {/if}
{/if}
{#if detailViewComponent }
  {#await detailViewComponent then { default : DetailViewImpl }}
    <Popover class="w-[800px] h-[800px] overflow-auto z-20" triggeredBy="#link" trigger="click">
      <DetailViewImpl systemid={fdata._system_object_id} />
    </Popover>
  {/await}
{/if}