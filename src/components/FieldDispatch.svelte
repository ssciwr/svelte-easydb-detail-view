<script>
  import { findSchemaColumn, hasField } from "../lib/easydbHelpers";
  import { P } from "flowbite-svelte";

  // Import our field components
  import Eas from "./Eas.svelte";
  import FieldLabel from "./FieldLabel.svelte";
  import CustomDataTypeUbhdgnd from "./CustomDataTypeUBHDGND.svelte";
  import Daterange from "./Daterange.svelte";
  import L10nTextField from "./L10nTextField.svelte";
  import OnelineL10nTextField from "./OnelineL10nTextField.svelte";
  import OnelineTextField from "./OnelineTextField.svelte";
  import TextField from "./TextField.svelte";
  import NotImplemented from "./NotImplemented.svelte";

  export let field;
  export let data;
  export let table;
  export let label;

  const fieldtype = findSchemaColumn(table, field).type;

</script>

<!-- Some fields are omitted from the detail view -->
{#if field.output.detail }
  <!-- Fields that are not present in the data are also omitted -->
  {#if hasField(data, table, field) }
    <P>
      {#if label}
        <P class="pt-4">
          <FieldLabel table={table} field={field}/>
        </P>
      {/if}
      <!-- Dispath based on the detected field type -->
      {#if fieldtype === "custom:base.custom-data-type-ubhdgnd.ubhdgnd"}
        <CustomDataTypeUbhdgnd data={data} field={field} table={table}/>
      {:else if fieldtype === "daterange" }
        <Daterange data={data} field={field} table={table}/>
      {:else if fieldtype === "eas" }
        <Eas data={data} field={field} table={table} />
      {:else if fieldtype === "text" || fieldtype === "string" }
        <TextField data={data} field={field} table={table}/>
      {:else if fieldtype === "text_l10n" }
        <L10nTextField data={data} field={field} table={table}/>
      {:else if fieldtype === "text_l10n_oneline" }
        <OnelineL10nTextField data={data} field={field} table={table}/>
      {:else if fieldtype === "text_oneline" }
        <OnelineTextField data={data} field={field} table={table}/>
      {:else}
        <NotImplemented message="Field Type {fieldtype} not yet implemented." />
      {/if}
    </P>
  {/if}
{/if}
