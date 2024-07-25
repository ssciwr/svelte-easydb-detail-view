<script>
  import { fieldData } from "../../lib/easydbHelpers";

  import { A } from "flowbite-svelte";
  
  export let data;
  export let table;
  export let field;

  const fdata = fieldData(data, table, field);
</script>

<A href={fdata.url}>{fdata.url}</A>