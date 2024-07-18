<script>
  import { hasContent, splitterTitle } from "../lib/easydbHelpers";
  import { appLanguageStore } from "../lib/stores";

  import { Accordion, AccordionItem } from "flowbite-svelte";

  export let data;
  export let fields;
  export let table;

  const options = JSON.parse(fields[0].options);
</script>

{#if hasContent(data, table, fields)}
  <Accordion class="pt-6">
    <AccordionItem open={options.default_open_detail}>
      <span slot="header">{splitterTitle(data, table, options, $appLanguageStore)}</span>
      <div class="-mt-4">
        <slot />
      </div>
    </AccordionItem>
  </Accordion>
{/if}
