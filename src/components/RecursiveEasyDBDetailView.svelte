<script>
  import { hasReverseSubData, hasSubData, linkedSubData, reverseLinkedSubData, splitterTitle } from "../lib/easydbHelpers"
  import { Li, List } from "flowbite-svelte";
  import { lang } from "../lib/l10n";

  import FieldDispatch from "./FieldDispatch.svelte";
  import Link from "./Link.svelte";
  import LinkedTable from "./LinkedTable.svelte";
  import Panel from "./Panel.svelte";
  import ReverseLinkedTable from "./ReverseLinkedTable.svelte";
  import Tabs from "./Tabs.svelte";
  import TabItem from "./TabItem.svelte";
  import FieldLabel from "./FieldLabel.svelte";
  
  export let fields;
  export let data;
  export let table;
  export let label = true;

  const firstField = fields[0];

  function findMatch(start, end) {
    let count = 0;
    for (const [i, field] of fields.entries()) {
      if (field.type === start) {
        count += 1;
      }
      if (field.type === end) {
        count -= 1;
      }
      if (count === 0) {
        return i;
      }
    }
  }

  function findTabs() {
    let depth = 0;
    let result = [];
    let start = 0;
    for (const [i, field] of fields.entries()) {
      if (field.type === "tabs-begin") {
        if (depth === 0) {
          start = i;
        }
        depth += 1;
      }
      if (field.type === "tabs-end") {
        depth -= 1;
      }
      if (field.type === "tab") {
        if (depth === 1) {
          result.push(i);
        }
      }
    }
    result.push(findMatch("tabs-begin", "tabs-end"))

    let polished = [];
    for(let i = 0; i < result.length - 1; i++) {
      polished.push(fields.slice(result[i], result[i + 1]));
    }
    return polished;
  }
</script>

{#if fields.length > 0}
  {#if firstField.kind === "field" }
    <FieldDispatch field={firstField} data={data} table={table} label={label}/>
    <svelte:self fields={fields.slice(1)} data={data} table={table} label={label}/>
  {:else if firstField.kind === "linked-table" }
    {#if hasSubData(data, table, firstField)}
      <FieldLabel field={firstField.mask.fields[0]} table={firstField.other_table_name_hint}/>
      <LinkedTable>
        <List>
          {#each linkedSubData(data, table, firstField) as subdata}
            <Li>
              <svelte:self fields={firstField.mask.fields} data={subdata} table={firstField.other_table_name_hint} label={false} />
            </Li>
          {/each}
        </List>
      </LinkedTable>
    {/if}
    <svelte:self fields={fields.slice(1)} data={data} table={table} label={label}/>
  {:else if firstField.kind === "reverse-linked-table" }
    {#if hasReverseSubData(data, table, firstField) }
      <ReverseLinkedTable>
        {#each reverseLinkedSubData(data, table, firstField) as subdata }
          <svelte:self fields={firstField.mask.fields} data={subdata} table={firstField.other_table_name_hint} label={label}/>
        {/each}
      </ReverseLinkedTable>
    {/if}
    <svelte:self fields={fields.slice(1)} data={data} table={table} label={label}/>
  {:else if firstField.kind === "splitter" }
    {#if firstField.type === "panel-begin" }
      <Panel fields={fields.slice(0, findMatch("panel-begin", "panel-end"))} data={data} table={table}>
        <svelte:self fields={fields.slice(1, findMatch("panel-begin", "panel-end"))} data={data} table={table} label={label}/>
      </Panel>
      <svelte:self fields={fields.slice(findMatch("panel-begin", "panel-end") + 1)} data={data} table={table} label={label}/>
    {:else if firstField.type === "tabs-begin" }
      <Tabs fields={fields} data={data} table={table}>
        {#each findTabs() as tab}
          <TabItem fields={tab} data={data} table={table}>
            <svelte:self fields={tab.slice(1)} data={data} table={table} label={label}/>
          </TabItem>
        {/each}
      </Tabs>
      <svelte:self fields={fields.slice(findMatch("tabs-begin", "tabs-end") + 1)} data={data} table={table} label={label}/>
    {:else if firstField.type === "split" }
      {splitterTitle(data, table, JSON.parse(firstField.options), lang)}
      <svelte:self fields={fields.slice(1)} data={data} table={table} label={label}/>
    {:else}
      <p>Splitter of type {firstField.type} not yet implemented.</p>
      <svelte:self fields={fields.slice(1)} data={data} table={table} label={label}/>
    {/if}
  {:else if firstField.kind === "link" }
    <Link field={firstField} data={data} table={table}/>
    <svelte:self fields={fields.slice(1)} data={data} table={table} label={label}/>
  {:else}
    <p>Mask element of kind {firstField.kind} not yet implemented.</p>
    <svelte:self fields={fields.slice(1)} data={data} table={table} label={label}/>
  {/if}
{/if}
