<script>
  import { fieldData } from "../lib/easydbHelpers";
  import { dataLanguagesStore } from "../lib/stores";
  import { bestLanguage } from "../lib/l10n";

  export let data;
  export let field;
  export let table;
</script>
  
<span class="easydb-oneline-l10n-text-field">{bestLanguage(fieldData(data, table, field), $dataLanguagesStore)}</span>
