<script>
  import { fieldData } from "../../lib/easydbHelpers";

  import { A } from "flowbite-svelte";
  import { ArrowUpRightFromSquareOutline } from "flowbite-svelte-icons";

  export let data;
  export let table;
  export let field;

  const fdata = fieldData(data, table, field);
</script>
  
<span class="easydb-custom-getty">
  {fdata.conceptName}
  <A href={fdata.conceptURI} target="_blank" rel="noopener noreferrer">
    <ArrowUpRightFromSquareOutline class="w-4 h-4"/>
  </A>
</span>
  