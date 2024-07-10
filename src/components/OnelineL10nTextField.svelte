<script>
  import { fieldData } from "../lib/easydbHelpers";
  import { bestLanguage } from "../lib/l10n";
  import { getContext } from "svelte";
  import { P } from "flowbite-svelte";
  
  export let data;
  export let field;
  export let table;

  const lang = getContext("l10n");
</script>
  
<P size="sm">{bestLanguage(fieldData(data, table, field), lang)}</P>
