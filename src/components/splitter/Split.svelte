<script>
  import { splitterTitle } from "../../lib/easydbHelpers";
  import { appLanguageStore } from "../../lib/stores";

  import { Heading } from "flowbite-svelte";

  export let field;
  export let data;
  export let table;
</script>

<Heading tag="h6" class="pt-4">
  {splitterTitle(data, table, JSON.parse(field.options), $appLanguageStore)}
</Heading>
