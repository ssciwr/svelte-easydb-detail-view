<script>
  import { fieldData, hasField } from "../lib/easydbHelpers";
  import { A, P } from "flowbite-svelte";
  import { getContext } from "svelte";

  import FieldLabel from "./FieldLabel.svelte";

  export let field;
  export let data;
  export let table;

  const lang = getContext("l10n");
  const fdata = fieldData(data, table, field);
</script>

{#if hasField(data, table, field)}
  <FieldLabel table={table} field={field} />
  <span class="easydb-link">
    <A href="https://heidicon.ub.uni-heidelberg.de/#/detail/{fdata._uuid}">
      {fdata["_standard"]["1"].text[lang]}
    </A>
  </span>
{/if}
