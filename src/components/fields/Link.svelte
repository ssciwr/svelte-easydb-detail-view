<script>
  import { fieldData, hasField, standardHasAsset, selectStandardAsset } from "../../lib/easydbHelpers";
  import { dataLanguagesStore, pushUUID } from "../../lib/stores";
  import { A, Card, P } from "flowbite-svelte";

  import FieldLabel from "./FieldLabel.svelte";

  export let field;
  export let data;
  export let table;
  export let condensed;

  const fdata = fieldData(data, table, field);
</script>

{#if hasField(data, table, field)}
  {#if !condensed}
    <P>
      <FieldLabel table={table} field={field} />
    </P>
  {/if}
  {#if standardHasAsset(fdata)}
    <Card class="easydb-link max-w-full h-32" img={selectStandardAsset(fdata)} horizontal>
      <A on:click={() => { pushUUID(fdata._uuid); }}>
        {fdata["_standard"]["1"].text[$dataLanguagesStore[0]]}
      </A>
    </Card>
  {:else}
    <span class="easydb-link">
      <A on:click={() => { pushUUID(fdata._uuid); }}>
        {fdata["_standard"]["1"].text[$dataLanguagesStore[0]]}
      </A>
    </span>
  {/if}
{/if}
