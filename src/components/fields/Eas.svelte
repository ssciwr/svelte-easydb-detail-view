<script>
  import { DownloadOutline } from "flowbite-svelte-icons";
  import { fieldData, selectDownloadAsset, selectPreviewAsset } from "../../lib/easydbHelpers";
  import { Card, P } from "flowbite-svelte";

  export let data;
  export let field;
  export let table;

  const fdata = fieldData(data, table, field);

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
</script>

{#each fdata as image}
  <Card img={selectPreviewAsset(image)} horizontal class="max-w-full">
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
    <a href={selectDownloadAsset(image)} target="_blank" rel="noopener noreferrer">
      <DownloadOutline class="w-6 h-6" />
    </a>
    </div>
  </Card>
{/each}
