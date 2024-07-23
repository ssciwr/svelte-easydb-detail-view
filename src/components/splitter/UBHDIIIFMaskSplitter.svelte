<script>
  import { fieldData } from "../../lib/easydbHelpers";
  import { appLanguageStore } from "../../lib/stores";

  import { P } from "flowbite-svelte";

  import NotImplemented from "../utils/NotImplemented.svelte";

  export let data;
  export let table;
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
<!-- https://gitlab.ub.uni-heidelberg.de/fdm/easydb-ubhd-iiif-mask-splitter-plugin/-/blob/master/src/webfrontend/UbhdIiifMaskSplitterPlugin.coffee?ref_type=heads#L50 -->
 <NotImplemented message="Need to reconstruct IIIF URL." />
</P>