<script>
  import { P, Spinner } from "flowbite-svelte";
</script>

<div class="easydb-waiting flex justify-center">
  <div>
    <P>
      <Spinner class="h-12 w-12"/>
    </P>
    <P class="pt-4">
      <slot />
    </P>
  </div>
</div>