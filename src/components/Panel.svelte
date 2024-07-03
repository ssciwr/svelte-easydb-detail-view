<script>
  import { hasContent, splitterTitle } from "../lib/easydbHelpers";
  import { lang } from "../lib/l10n";

  import { Accordion, AccordionItem } from "flowbite-svelte";

  export let data;
  export let fields;
  export let table;

  const options = JSON.parse(fields[0].options);

</script>

{#if hasContent(data, table, fields)}
  <Accordion>
    <AccordionItem open={options.default_open_detail}>
      <span slot="header">{splitterTitle(data, table, options, lang)}</span>
      <slot />
    </AccordionItem>
  </Accordion>
{/if}
