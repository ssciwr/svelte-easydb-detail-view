<script>
    import { fieldData } from "../../lib/easydbHelpers";
  
    export let data;
    export let field;
    export let table;

    const fdata = fieldData(data, table, field);
  </script>
  
  <span class="easydb-date-field">{fdata["value"]}</span>
