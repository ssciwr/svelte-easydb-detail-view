<script>
  import { fieldData, hasField } from "../../lib/easydbHelpers";
  import { dataLanguagesStore } from "../../lib/stores";
  import { A, P } from "flowbite-svelte";

  import FieldLabel from "./FieldLabel.svelte";

  export let field;
  export let data;
  export let table;

  const fdata = fieldData(data, table, field);
</script>

{#if hasField(data, table, field)}
  <P class="pt-4">
    <FieldLabel table={table} field={field} />
  </P>
  <div class="easydb-link">
    <A href="https://heidicon.ub.uni-heidelberg.de/#/detail/{fdata._uuid}">
      {fdata["_standard"]["1"].text[$dataLanguagesStore[0]]}
    </A>
  </div>
{/if}
