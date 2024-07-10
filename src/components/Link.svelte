<script>
  import { fieldData, fieldLabel, hasField } from "../lib/easydbHelpers";
  import { lang } from "../lib/l10n"
  import { A, P } from "flowbite-svelte";

  export let field;
  export let data;
  export let table;

  const fdata = fieldData(data, table, field);
</script>

{#if hasField(data, table, field)}
  <P size="sm">{fieldLabel(table, field, lang)}</P>
  <P size="sm">
    <A href="https://heidicon.ub.uni-heidelberg.de/#/detail/{fdata._uuid}">
      {fdata["_standard"]["1"].text[lang]}
    </A>
  </P>
{/if}
