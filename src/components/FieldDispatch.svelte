<script>
  import { findSchemaColumn, hasField } from "../lib/easydbHelpers";

  // Import our field components
  import Daterange from "./Daterange.svelte";
  import L10nTextField from "./L10nTextField.svelte";
  import OnelineL10nTextField from "./OnelineL10nTextField.svelte";
  import OnelineTextField from "./OnelineTextField.svelte";
  import TextField from "./TextField.svelte";

  export let field;
  export let data;
  export let table;

  const fieldtype = findSchemaColumn(table, field).type;
</script>

<!-- Some fields are omitted from the detail view -->
{#if field.output.detail }
  <!-- Fields that are not present in the data are also omitted -->
  {#if hasField(data, table, field) }
    <!-- Dispath based on the detected field type -->
    {#if fieldtype === "daterange" }
      <Daterange data={data} field={field} table={table}/>
    {:else if fieldtype === "text" }
      <TextField data={data} field={field} table={table}/>
    {:else if fieldtype === "text_l10n" }
      <L10nTextField data={data} field={field} table={table}/>
    {:else if fieldtype === "text_l10n_oneline" }
      <OnelineL10nTextField data={data} field={field} table={table}/>
    {:else if fieldtype === "text_oneline" }
      <OnelineTextField data={data} field={field} table={table}/>
    {:else}
      <p>Field Type {fieldtype} not yet implemented.</p>
    {/if}
  {/if}
{/if}
