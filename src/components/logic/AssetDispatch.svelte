<script>
  import NotImplemented from "../utils/NotImplemented.svelte";

  export let asset;

  // Importing all the implememented viewers.
  import ImageViewer from "../viewer/ImageViewer.svelte";
  import VideoViewer from "../viewer/VideoViewer.svelte";

  // Mapping the "class" names from the data to a Svelte component
  // implementing the respective viewer.
  const componentMapping = {
    "audio": VideoViewer,
    "image": ImageViewer,
    "video": VideoViewer,
  };
</script>

{#if asset.class in componentMapping}
  <svelte:component this={componentMapping[asset.class]} asset={asset} />
{:else}
  <NotImplemented message="Asset type '{asset.class}' not implemented" />
{/if}
