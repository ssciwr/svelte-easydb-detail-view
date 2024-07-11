<script>
  import { getContext } from "svelte";
  import { hasContent, splitterTitle } from "../lib/easydbHelpers";

  import { Accordion, AccordionItem } from "flowbite-svelte";

  export let data;
  export let fields;
  export let table;

  const options = JSON.parse(fields[0].options);
  const lang = getContext("l10n");
</script>

{#if hasContent(data, table, fields)}
  <Accordion class="pt-6">
    <AccordionItem open={options.default_open_detail}>
      <span slot="header">{splitterTitle(data, table, options, lang)}</span>
      <div class="-mt-4">
        <slot />
      </div>
    </AccordionItem>
  </Accordion>
{/if}
