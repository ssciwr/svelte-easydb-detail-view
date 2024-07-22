<script>
	import { Video } from "flowbite-svelte";

  export let asset;
</script>

<Video src={asset.versions.original.url} poster={asset.versions.preview.url} controls />