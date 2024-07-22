<script>
  import { fieldLabel } from "../../lib/easydbHelpers";
  import { appLanguageStore } from "../../lib/stores";

  export let field;
  export let table;
</script>

{#if !(field.custom_settings.hide_label === true)}
  <span class="text-sm easydb-label">{fieldLabel(table, field, $appLanguageStore)}</span>
{/if}
