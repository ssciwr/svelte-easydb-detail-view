<script>
    import { fieldData } from "../lib/easydbHelpers";
    import { P } from "flowbite-svelte";
  
    export let data;
    export let field;
    export let table;
  </script>
  
  <P size="sm">{fieldData(data, table, field)}</P>
