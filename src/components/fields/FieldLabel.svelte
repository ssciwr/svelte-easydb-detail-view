<script>
  import { fieldLabel } from "../../lib/easydbHelpers";
  import { appLanguageStore } from "../../lib/stores";

  export let field;
  export let table;
</script>

<span class="text-sm easydb-label">{fieldLabel(table, field, $appLanguageStore)}</span>
