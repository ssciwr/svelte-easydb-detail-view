<script>
  import { appLanguageStore } from "../../lib/stores";

  import { P } from "flowbite-svelte";

  import NotImplemented from "../utils/NotImplemented.svelte";

  export let data;
  export let field;
  
  const options = JSON.parse(field.options);

  const l10n = {
    "iiif-url": {
      "de-DE": "IIIF-Image-URL",
      "en-US": "IIIF image URL",
    },
  };

</script>

<P>
  <span class="text-sm easydb-label">{l10n["iiif-url"][$appLanguageStore]}</span>
</P>
<P>
  {options.url_prefix}/{data._system_object_id}%3A
 <NotImplemented message="How to get the asset ID here?" />
</P>
