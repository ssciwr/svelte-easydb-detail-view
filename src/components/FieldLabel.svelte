<script>
  import { getContext } from "svelte";
  import { fieldLabel } from "../lib/easydbHelpers";
  import { P } from "flowbite-svelte";

  export let field;
  export let table;

  const lang = getContext("l10n");
</script>

<P size="sm">{fieldLabel(table, field, lang)}</P>
