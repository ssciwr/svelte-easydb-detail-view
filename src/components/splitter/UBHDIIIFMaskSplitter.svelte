<script>
  import { appLanguageStore } from "../../lib/stores";

  import { P } from "flowbite-svelte";

  export let data;
  export let field;
  export let table;
  
  const options = JSON.parse(field.options);

  const l10n = {
    "iiif-url": {
      "de-DE": "IIIF-Image-URL",
      "en-US": "IIIF image URL",
    },
  };

  const dtable = table in data ? data[table] : data;

</script>

<P>
  <span class="text-sm easydb-label">{l10n["iiif-url"][$appLanguageStore]}</span>
</P>
<P>
  <!-- NB: The "asset" in the line below is a hard-coding to HeidICON that also happens upstream! -->
  {options.url_prefix}/{data._system_object_id}%3A{dtable.asset[0]._id}
</P>
