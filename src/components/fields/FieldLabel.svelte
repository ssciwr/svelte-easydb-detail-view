<script>
  import { fieldLabel } from "../../lib/easydbHelpers";
  import { getContext } from 'svelte';

  // Get stores from context
  const stores = getContext('stores');
  const { appLanguageStore, easydbInstanceDataStore } = stores;

  export let field;
  export let table;
</script>

{#if !(field.custom_settings.hide_label === true)}
  <span class="text-sm easydb-label">{fieldLabel(table, field, $appLanguageStore, easydbInstanceDataStore)}</span>
{/if}
