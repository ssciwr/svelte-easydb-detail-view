<script>
  import { fieldData } from "../../lib/easydbHelpers";

  import { MapPinAltSolid } from "flowbite-svelte-icons";

  export let data;
  export let table;
  export let field;

  const fdata = fieldData(data, table, field);
</script>

<div class="easydb-custom-location flex items-center">
  <MapPinAltSolid class="w-12 h-12"/>
  {fdata.mapPosition.position.lat}, {fdata.mapPosition.position.lng}
</div>
