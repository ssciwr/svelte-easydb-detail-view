<script>
  import { fieldData } from "../../lib/easydbHelpers";

  import { A } from "flowbite-svelte";
  import { ArrowUpRightFromSquareOutline } from "flowbite-svelte-icons";

  export let data;
  export let table;
  export let field;

  const fdata = fieldData(data, table, field);

  function extractYear(date) {
    if (date) {
      return date.split("-")[0];
    }
    return "";
  }

  function detailString(details) {
    if (details.dateOfDeath) {
      if (details.dateOfBirth) {
        return ` (${extractYear(details.dateOfBirth)} - ${extractYear(details.dateOfDeath)})`;
      }
      return ` (? - ${extractYear(details.dateOfDeath)})`;
    }
    return "";
  }
</script>

<span class="easydb-custom-ubhdgnd">
  {fdata.conceptName}{detailString(fdata.conceptDetails)}
  <A href={fdata.conceptURI} target="_blank" rel="noopener noreferrer">
    <ArrowUpRightFromSquareOutline class="w-4 h-4"/>
  </A>
</span>
