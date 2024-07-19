<script>
  import { fieldData } from "../../lib/easydbHelpers";
  import { appLanguageStore } from "../../lib/stores";

  export let data;
  export let field;
  export let table;

  const translations = {
    "de-DE": {
      true: "Ja",
      false: "Nein",
    },
    "en-US": {
      true: "Yes",
      false: "No",
    },
    "fr-FR": {
      true: "Oui",
      false: "Non",
    },
    "it-IT": {
      true: "Sì",
      false: "No",
    },
    "es-ES": {
      true: "Sí",
      false: "No",
    },
  }
</script>

<span class="easydb-boolean-field">{translations[$appLanguageStore][fieldData(data, table, field)]}</span>
