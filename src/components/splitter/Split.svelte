<script>
  import { getContext } from "svelte";
  import { splitterTitle } from "../../lib/easydbHelpers";

  import { Heading } from "flowbite-svelte";

  export let field;
  export let data;
  export let table;

  const stores = getContext('stores');
  const { appLanguageStore } = stores;
</script>

<Heading tag="h6">
  {splitterTitle(data, table, JSON.parse(field.options), $appLanguageStore)}
</Heading>
