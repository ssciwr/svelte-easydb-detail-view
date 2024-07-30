<script>
  import { splitterTitle } from "../../lib/easydbHelpers";
  import { appLanguageStore } from "../../lib/stores";

  import { Card, Heading } from "flowbite-svelte";

  export let fields;
  export let data;
  export let table;
  export let output;

  const options = JSON.parse(fields[0].options);
</script>

<Card horizontal class="max-w-full block space-y-2">
  <Heading tag="h6">
    {splitterTitle(data, table, options, $appLanguageStore)}
  </Heading>
  <slot />
</Card>
