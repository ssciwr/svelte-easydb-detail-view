<script>
    import { fieldData } from "../lib/easydbHelpers";
    import { P } from "flowbite-svelte";
  
    export let data;
    export let field;
    export let table;

    const fdata = fieldData(data, table, field);
  </script>
  
  <P size="sm">{fdata["from"]} - {fdata["to"]}</P>
