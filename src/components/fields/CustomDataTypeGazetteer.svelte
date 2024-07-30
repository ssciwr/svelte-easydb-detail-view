<script>
  import { dataLanguagesStore } from "../../lib/stores";
  import { fieldData } from "../../lib/easydbHelpers";

  import { A } from "flowbite-svelte";
  import { ArrowUpRightFromSquareOutline } from "flowbite-svelte-icons";

  export let data;
  export let table;
  export let field;

  const fdata = fieldData(data, table, field);

  const l10n = {
    "populated-place": {
      "de-DE": "Bewohnter Ort"
    },
    "administrative-unit": {
      "de-DE": "Verwaltungseinheit"
    },
    "archaeological-site": {
      "de-DE": "Archäologischer Ort"
    },
    "archaeological-area": {
      "de-DE": "Archäologischer Bereich"
    },
    "continent": {
      "de-DE": "Kontinent"
    },
    "building-institution": {
      "de-DE": "Standort/Institution"
    },
    "landform": {
      "de-DE": "Landform"
    },
    "hydrography": {
      "de-DE": "Hydrographie"
    }
  };

  function detailString() {
    if ((fdata.length === 0) || (!$dataLanguagesStore.includes("de-DE"))) {
      return "";
    }
    return `(${fdata.types.map((t) => l10n[t]["de-DE"]).join(", ")})`;
  }
</script>


{fdata.displayName} {detailString()}
<A href={"https://gazetteer.dainst.org/app/#!/show/" + fdata.gazId}>
  <ArrowUpRightFromSquareOutline class="w-4 h-4"/>
</A>
