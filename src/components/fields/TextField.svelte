<script>
  import { fieldData } from "../../lib/easydbHelpers";

  export let data;
  export let field;
  export let table;
</script>

<span class="easydb-text-field">{fieldData(data, table, field)}</span>