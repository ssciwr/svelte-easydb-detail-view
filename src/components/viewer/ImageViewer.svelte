<!-- NB: This component is used much less than you would expect, because
         datasets that do only have image assets are displayed using the
         Carousel component from Flowbite Svelte. Only in the case of mixing
         image and non-image assets this is used to display images. -->
<script>
  import { Img } from "flowbite-svelte";

  export let asset;
</script>

<Img src={asset.versions.preview.url} alt={asset.original_filename} />
