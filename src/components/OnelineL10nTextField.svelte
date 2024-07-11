<script>
  import { fieldData } from "../lib/easydbHelpers";
  import { bestLanguage } from "../lib/l10n";
  import { getContext } from "svelte";

  export let data;
  export let field;
  export let table;

  const lang = getContext("l10n");
</script>
  
<span class="easydb-oneline-l10n-text-field">{bestLanguage(fieldData(data, table, field), lang)}</span>
