<script>
  import { fieldLabel } from "../lib/easydbHelpers";
  import { lang } from "../lib/l10n";
  import { P } from "flowbite-svelte";

  export let field;
  export let table;
</script>

<P size="sm">{fieldLabel(table, field, lang)}</P>
