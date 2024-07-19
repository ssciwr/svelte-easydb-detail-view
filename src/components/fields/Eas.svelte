<script>
  import { VERSION } from "svelte/compiler";
import { fieldData } from "../../lib/easydbHelpers";
  import { Img } from "flowbite-svelte";

  export let data;
  export let field;
  export let table;

  const fdata = fieldData(data, table, field);

  // The order of priority for selecting the preview image
  const preview_priority = ["preview", "small", "huge", "full", "original"];

  function select_preview_image(img) {
    for(let version of preview_priority) {
      if("download_url" in img.versions[version]) {
        return version;
      }
    }
  }
</script>

{#each fdata as image}
  {#if select_preview_image(image) !== undefined }
    <Img src={image.versions[select_preview_image(image)].download_url} />
  {/if}
  {image.original_filepath}
  {image.versions[select_preview_image(image)].dpi} DPI
{/each}
