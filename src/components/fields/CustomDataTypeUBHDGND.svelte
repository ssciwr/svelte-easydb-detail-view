<script>
  import { fieldData } from "../../lib/easydbHelpers";
  import { A, P } from "flowbite-svelte";

  export let data;
  export let table;
  export let field;

  const fdata = fieldData(data, table, field);
</script>

<span class="easydb-custom-ubhdgnd">
  {fdata.conceptName}
  <A href={fdata.conceptURI}>GND</A>
</span>
