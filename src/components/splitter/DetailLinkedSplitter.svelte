<script>
  import { getContext } from 'svelte';
  import { A } from "flowbite-svelte";
  
  // Get stores from context
  const stores = getContext('stores');
  const { easydbInstanceStore, currentSystemId } = stores;
</script>

Omitting linked objects in this viewer. Look at it in the
<A href="{$easydbInstanceStore}/#/details/{$currentSystemId}" target="_blank" rel="noopener noreferrer">
  EasyDB instance
</A>
instead.
