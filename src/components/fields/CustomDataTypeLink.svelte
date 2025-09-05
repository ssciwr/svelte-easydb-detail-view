<script>
  import { getContext } from "svelte";
  import { bestLanguage } from "../../lib/l10n";
  import { fieldData } from "../../lib/easydbHelpers";

  import { A } from "flowbite-svelte";
  
  export let data;
  export let table;
  export let field;

  const stores = getContext('stores');
  const { dataLanguagesStore } = stores;

  const fdata = fieldData(data, table, field);

  function findText() {
    if ("text" in fdata) {
      return bestLanguage(fdata.text, $dataLanguagesStore)
    }
    return fdata.url;
  }
</script>

<A href={fdata.url} target="_blank" rel="noopener noreferrer">
  {findText()}
</A>