<script>
    import { fieldData } from "../lib/easydbHelpers";
    import { P } from "flowbite-svelte";
  
    export let data;
    export let field;
    export let table;

    const fdata = fieldData(data, table, field);
  </script>
  
  <span class="easydb-daterange-field">{fdata["from"]} - {fdata["to"]}</span>
