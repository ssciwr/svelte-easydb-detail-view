<script>
  import { getContext } from "svelte";
  import { fieldLabel } from "../lib/easydbHelpers";

  export let field;
  export let table;

  let lang = getContext("appLanguage");
</script>

<span class="text-sm easydb-label">{fieldLabel(table, field, $lang)}</span>
