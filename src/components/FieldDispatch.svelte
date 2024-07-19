<script>
  import { findSchemaColumn, hasField } from "../lib/easydbHelpers";
  import { P } from "flowbite-svelte";

  // Import our field components
  import Boolean from "./Boolean.svelte";
  import CustomDataTypeUbhdgnd from "./CustomDataTypeUBHDGND.svelte";
  import Date from "./Date.svelte";
  import Daterange from "./Daterange.svelte";
  import Eas from "./Eas.svelte";
  import FieldLabel from "./FieldLabel.svelte";
  import L10nTextField from "./L10nTextField.svelte";
  import OnelineL10nTextField from "./OnelineL10nTextField.svelte";
  import OnelineTextField from "./OnelineTextField.svelte";
  import TextField from "./TextField.svelte";
  import NotImplemented from "./NotImplemented.svelte";
  import NoOp from "./NoOp.svelte";

  export let field;
  export let data;
  export let table;
  export let nested;

  const WrapperComponent = nested ? NoOp : P;

  const fieldtype = findSchemaColumn(table, field).type;

  const componentMapping = {
    "boolean": Boolean,
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

<!-- Some fields are omitted from the detail view -->
{#if field.output.detail }
  <!-- Fields that are not present in the data are also omitted -->
  {#if hasField(data, table, field) }
    <svelte:component this={WrapperComponent} class="pt-4">
      {#if !nested}
        <P class="pt-4">
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
{/if}
