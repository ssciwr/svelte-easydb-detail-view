<script>
  import { Card } from "flowbite-svelte";

  export let field;
  export let data;
  export let table;
</script>

<Card horizontal class="max-w-full block space-y-2">
  <slot />
</Card>
