<script>
  import { findSchemaColumn, hasField } from "../../lib/easydbHelpers";
  import { getContext } from 'svelte';
  import { P } from "flowbite-svelte";

  // Import our field components
  import Boolean from "../fields/Boolean.svelte";
  import CustomDataTypeGazetteer from "../fields/CustomDataTypeGazetteer.svelte";
  import CustomDataTypeGeonames from "../fields/CustomDataTypeGeonames.svelte";
  import CustomDataTypeGeoref from "../fields/CustomDataTypeGeoref.svelte";
  import CustomDataTypeGetty from "../fields/CustomDataTypeGetty.svelte";
  import CustomDataTypeGND from "../fields/CustomDataTypeGND.svelte";
  import CustomDataTypeLink from "../fields/CustomDataTypeLink.svelte";
  import CustomDataTypeLocation from "../fields/CustomDataTypeLocation.svelte";
  import CustomDataTypeUbhdgnd from "../fields/CustomDataTypeUBHDGND.svelte";
  import Date from "../fields/Date.svelte";
  import Daterange from "../fields/Daterange.svelte";
  import Eas from "../fields/Eas.svelte";
  import FieldLabel from "../fields/FieldLabel.svelte";
  import L10nTextField from "../fields/L10nTextField.svelte";
  import OnelineL10nTextField from "../fields/OnelineL10nTextField.svelte";
  import OnelineTextField from "../fields/OnelineTextField.svelte";
  import TextField from "../fields/TextField.svelte";
  import NotImplemented from "../utils/NotImplemented.svelte";
  import NoOp from "../utils/NoOp.svelte";

  export let field;
  export let data;
  export let table;
  export let condensed;

  // Get stores from context
  const stores = getContext('stores');
  const { easydbInstanceDataStore } = stores;

  const WrapperComponent = condensed ? NoOp : P;

  const fieldtype = findSchemaColumn(table, field, easydbInstanceDataStore).type;

  const componentMapping = {
    "boolean": Boolean,
    "custom:base.custom-data-type-gazetteer.gazetteer": CustomDataTypeGazetteer,
    "custom:base.custom-data-type-geonames.geonames": CustomDataTypeGeonames,
    "custom:base.custom-data-type-georef.georef": CustomDataTypeGeoref,
    "custom:base.custom-data-type-getty.getty": CustomDataTypeGetty,
    "custom:base.custom-data-type-gnd.gnd": CustomDataTypeGND,
    "custom:base.custom-data-type-link.link": CustomDataTypeLink,
    "custom:base.custom-data-type-location.location": CustomDataTypeLocation,
    "custom:base.custom-data-type-ubhdgnd.ubhdgnd": CustomDataTypeUbhdgnd,
    "date": Date,
    "daterange": Daterange,
    "eas": Eas,
    "text": TextField,
    "string": TextField,
    "text_l10n": L10nTextField,
    "text_l10n_oneline": OnelineL10nTextField,
    "text_oneline": OnelineTextField,
  };
</script>

<!-- Fields that are not present in the data are also omitted -->
{#if hasField(data, table, field, easydbInstanceDataStore) }
  <svelte:component this={WrapperComponent}>
    {#if !condensed}
      <P>
        <FieldLabel table={table} field={field}/>
      </P>
    {/if}
    {#if fieldtype in componentMapping}
      <svelte:component this={componentMapping[fieldtype]} data={data} field={field} table={table}/>
    {:else}
      <NotImplemented message="Field Type {fieldtype} not yet implemented." />
    {/if}
  </svelte:component>
{/if}
