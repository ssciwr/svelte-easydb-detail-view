<script>
  import { P } from "flowbite-svelte";

  export let message;

  console.warn(message);
</script>

<div class="easydb-not-implemented">
  <P class="bg-red-100">
    {message}
  </P>
</div>
