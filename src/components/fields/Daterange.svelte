<script>
  import { fieldData } from "../../lib/easydbHelpers";

  export let data;
  export let field;
  export let table;

  const fdata = fieldData(data, table, field);

  function format(date) {
    // We do have dates of the form "0300", which should be displayed as "300".
    if (!isNaN(Number(date))) {
      return String(Number(date));
    }
    // Additional formatting rules might be required here.

    return date;
  }
</script>

<!-- EasyDB seems to have a shortcut to collapse date ranges to actual dates if
start and end that coincide. We do the same here. -->
{#if fdata["from"] === fdata["to"]}
  <span class="easydb-daterange-field">{format(fdata["from"])}</span>
{:else}
  <span class="easydb-daterange-field">{format(fdata["from"])} - {format(fdata["to"])}</span>
{/if}
