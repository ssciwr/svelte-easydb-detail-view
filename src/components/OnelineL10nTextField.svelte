<script>
    import { fieldData } from "../lib/easydbHelpers";
    import { lang } from "../lib/l10n";
    import { P } from "flowbite-svelte";
  
    export let data;
    export let field;
    export let table;
  </script>
  
  <P size="sm">{fieldData(data, table, field)[lang]}</P>
