<script>
  import { hasContent, splitterTitle } from "../../lib/easydbHelpers";
  import { getContext } from 'svelte';

  import { Accordion, AccordionItem } from "flowbite-svelte";

  // Get stores from context
  const stores = getContext('stores');
  const { appLanguageStore, easydbInstanceDataStore } = stores;

  export let data;
  export let fields;
  export let table;
  export let output;

  const options = JSON.parse(fields[0].options);
</script>

{#if hasContent(data, table, fields, output, easydbInstanceDataStore)}
  <Accordion>
    <AccordionItem open={options.default_open_detail}>
      <span slot="header">{splitterTitle(data, table, options, $appLanguageStore, easydbInstanceDataStore)}</span>
      <div class="space-y-4">
        <slot />
      </div>
    </AccordionItem>
  </Accordion>
{/if}
