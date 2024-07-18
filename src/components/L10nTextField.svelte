<script>
  import { getContext } from "svelte";
  import { fieldData } from "../lib/easydbHelpers";
  import { bestLanguage } from "../lib/l10n";
  
  export let data;
  export let field;
  export let table;

  const lang = getContext("dataLanguages")[0];
</script>
  
<span class="easydb-l10n-text-field">{bestLanguage(fieldData(data, table, field), $lang)}</span>
