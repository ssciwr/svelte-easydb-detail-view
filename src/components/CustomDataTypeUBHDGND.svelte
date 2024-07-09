<script>
  import { fieldLabel, fieldData } from "../lib/easydbHelpers";
  import { lang } from "../lib/l10n";
  import { A, P } from "flowbite-svelte";

  export let data;
  export let table;
  export let field;

  const fdata = fieldData(data, table, field);
</script>

<P size="sm">{fieldLabel(table, field, lang)}</P>
<P size="sm">
  {fdata.conceptName}
  <A href={fdata.conceptURI}>GND</A>
</P>