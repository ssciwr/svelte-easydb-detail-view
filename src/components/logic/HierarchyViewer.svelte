<script>
  import { easydbChildrenObject } from "../../lib/apiaccess";
  import { pushSystemID } from "../../lib/stores";

  import { A, Accordion, AccordionItem } from "flowbite-svelte";
  import StandardRendering from "./StandardRendering.svelte";
  import Waiting from "../utils/Waiting.svelte";

  export let openids = [];
  export let table;
  export let root;
</script>

<Accordion>
  {#if root._has_children}
    <AccordionItem open={openids.includes(root[table]._id)}>
     <span slot="header">
        <A on:click={ () => { pushSystemID(root._system_object_id); }}>
          <StandardRendering data={root} asset={true}/>
        </A>
      </span>
      {#await easydbChildrenObject(root[table]._id, table)}
        <Waiting>
          Loading children...
        </Waiting>
      {:then children}
        {#each children.objects as child}
          <svelte:self openids={openids} root={child} table={table}/>
        {/each}
      {/await}
    </AccordionItem>
  {:else}
    <AccordionItem open={openids.includes(root[table]._id)}>
      <div slot="arrowup" />
      <div slot="arrowdown" />
      <span slot="header">
        <A on:click={ () => { pushSystemID(root._system_object_id); }}>
          <StandardRendering data={root} asset={true}/>
        </A>
      </span>
    </AccordionItem>
  {/if}
</Accordion>
