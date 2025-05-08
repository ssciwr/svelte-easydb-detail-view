<script>
  import { DownloadOutline } from "flowbite-svelte-icons";
  import { fieldData } from "../../lib/easydbHelpers";
  import { Card, P } from "flowbite-svelte";

  export let data;
  export let field;
  export let table;

  const fdata = fieldData(data, table, field);

  function has_preview_image(img) {
    if (!img.versions.preview) {
      return false;
    }
    if (img.versions.preview.class === "image") {
      return true;
    }
    return false;
  }

  function technical_metadata(image) {
    let snippets = [];
    if("dpi" in image.technical_metadata) {
      snippets.push(`${image.technical_metadata.dpi} DPI`);
    }
    if("colorprofile" in image.technical_metadata) {
      snippets.push(image.technical_metadata.colorprofile);
    }
    return snippets.join(", ");
  }

  console.log(fdata)
</script>

{#each fdata as image}
  <Card img={has_preview_image(image) ? image.versions["preview"].url : null} horizontal class="max-w-full">
    <div class="flex items-center ">
    <span>
      <P>
        {image.original_filepath}
      </P>
      <P>
        {#if image.versions.original.compiled}
          {image.versions.original.compiled}
        {:else}
          {technical_metadata(image)}
        {/if}
      </P>
    </span>
    <a href={image.versions.original.url} target="_blank" rel="noopener noreferrer">
      <DownloadOutline class="w-6 h-6" />
    </a>
    </div>
  </Card>
{/each}
