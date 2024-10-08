<script>
  import { easydbInstanceStore, systemidStore } from "../../lib/stores";

  import { A } from "flowbite-svelte";
</script>

Omitting linked objects in this viewer. Look at it in the
<A href="{$easydbInstanceStore}/#/details/{$systemidStore.at(-1)}" target="_blank" rel="noopener noreferrer">
  EasyDB instance
</A>
instead.
