<script>
  import { bestLanguage } from "../../lib/l10n";
  import { dataLanguagesStore } from "../../lib/stores";
  import { fieldData } from "../../lib/easydbHelpers";

  import { A } from "flowbite-svelte";
  
  export let data;
  export let table;
  export let field;

  const fdata = fieldData(data, table, field);
</script>

<A href={fdata.url}>{bestLanguage(fdata.text, $dataLanguagesStore)}</A>