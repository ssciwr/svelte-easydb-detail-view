<script>
  import { fieldData, findSchemaColumn, hasReverseSubData, hasSubData, linkedSubData, reverseLinkedSubData } from "../../lib/easydbHelpers";

  import { Carousel, Pagination } from "flowbite-svelte";
  import AssetDispatch from "./AssetDispatch.svelte";

  export let fields;
  export let table;
  export let data;

  function findAssets(fields, table, data) {
    let ret = [];
    for (const field of fields) {
      if (field.kind === "field") {
        if (findSchemaColumn(table, field).type === "eas") {
          ret = ret.concat(fieldData(data, table, field));
        }
      }
      if (field.kind === "linked-table") {
        if (hasSubData(data, table, field)) {
          for (const subdata of linkedSubData(data, table, field)) {
            ret = ret.concat(findAssets(field.mask.fields, field.other_table_name_hint, subdata));
          }
        }
      }
      if (field.kind === "reverse-linked-table") {
        if (hasReverseSubData(data, table, field)) {
          for (const subdata of reverseLinkedSubData(data, table, field)) {
            ret = ret.concat(findAssets(field.mask.fields, field.other_table_name_hint, subdata));
          }
        }
      }
    }
    return ret;
  }

  function getCarouselImages(assets) {
    return assets.map((asset) => { return {src: asset.versions.preview.url}});
  }

  const assets = findAssets(fields, table, data);
</script>

<!-- If there are no assets, no viewer is shown -->
{#if assets.length > 0}
  <!-- If all assets are images, we show them as a carousel, as we have this
  component readily available from flowbite svelte -->
  {#if assets.every((asset) => asset.class === "image") }
    <Carousel images={getCarouselImages(assets)} imgClass="object-contain" class="bg-gray-200" let:Controls>
      {#if assets.length > 1}
        <Controls />
      {/if}
    </Carousel>
  {:else}
    <!-- In this case we construct our own carousel-like thing with pagination -->
    {#if assets.length > 1}
      Pagination
      <!-- <Pagination /> -->
    {/if}
    {#each assets as asset}
      <AssetDispatch asset={asset} />
    {/each}
  {/if}
{/if}
