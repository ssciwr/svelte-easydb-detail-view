<script>
  import { fieldData } from "../../lib/easydbHelpers";

  export let data;
  export let field;
  export let table;

  const fdata = fieldData(data, table, field);
  const from = Number(fdata["from"]);
  const to = Number(fdata["to"]);
</script>

<!-- EasyDB seems to have a shortcut to collapse date ranges to actual dates if
start and end that coincide. We do the same here. -->
{#if from === to}
  <span class="easydb-daterange-field">{from}</span>
{:else}
  <span class="easydb-daterange-field">{from} - {to}</span>
{/if}
