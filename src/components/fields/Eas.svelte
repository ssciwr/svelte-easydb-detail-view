<script>
  import { fieldData } from "../../lib/easydbHelpers";
  import { Card, P } from "flowbite-svelte";

  export let data;
  export let field;
  export let table;

  const fdata = fieldData(data, table, field);

  function has_preview_image(img) {
    if (img.versions.preview.class === "image") {
      return true;
    }
    return false;
  }
</script>

{#each fdata as image}
  <Card img={has_preview_image(image) ? image.versions["preview"].url : null} horizontal class="max-w-full">
    <P>
      {image.original_filepath}
    </P>
    <P>
      {#if image.versions.original.compiled}
        {image.versions.original.compiled}
      {:else}
        Need to freestyle information here.
      {/if}
    </P>
  </Card>
{/each}
