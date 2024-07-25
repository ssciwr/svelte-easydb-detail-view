<script>
  import { fieldData, hasField } from "../../lib/easydbHelpers";
  import { dataLanguagesStore } from "../../lib/stores";
  import { A, Card, P } from "flowbite-svelte";

  import FieldLabel from "./FieldLabel.svelte";

  export let field;
  export let data;
  export let table;
  export let condensed;

  const fdata = fieldData(data, table, field);
  const image_preference = ["preview", "small", "huge", "full", "original"];

  function assetImage() {
    if (!("eas" in fdata._standard)) {
      return null;
    }

    for (const pref of image_preference) {
      console.log(fdata._standard.eas);
      if (pref in fdata._standard.eas["1"][0].versions) {
        return fdata._standard.eas["1"][0].versions[pref].url;
      }
    }

    return null;
  }
</script>

{#if hasField(data, table, field)}
  {#if !condensed}
    <P class="pt-4">
      <FieldLabel table={table} field={field} />
    </P>
  {/if}
  {#if assetImage()}
    <Card class="easydb-link max-w-full h-32" img={assetImage()} horizontal>
      <A href="https://heidicon.ub.uni-heidelberg.de/#/detail/{fdata._uuid}">
        {fdata["_standard"]["1"].text[$dataLanguagesStore[0]]}
      </A>
    </Card>
  {:else}
    <span class="easydb-link">
      <A href="https://heidicon.ub.uni-heidelberg.de/#/detail/{fdata._uuid}">
        {fdata["_standard"]["1"].text[$dataLanguagesStore[0]]}
      </A>
    </span>
  {/if}
{/if}
