<script>
  import { hasReverseSubData, hasSubData, linkedSubData, reverseLinkedSubData, splitterTitle } from "../../lib/easydbHelpers";
  import { Li, List, P } from "flowbite-svelte";
  
  import CustomSplitterDispatch from "./CustomSplitterDispatch.svelte";
  import FieldDispatch from "./FieldDispatch.svelte";
  import Link from "../fields/Link.svelte";
  import LinkedTable from "../fields/LinkedTable.svelte";
  import Panel from "../splitter/Panel.svelte";
  import ReverseLinkedTable from "../fields/ReverseLinkedTable.svelte";
  import Split from "../splitter/Split.svelte";
  import Tabs from "../splitter/Tabs.svelte";
  import TabItem from "../splitter/TabItem.svelte";
  import FieldLabel from "../fields/FieldLabel.svelte";
  import NotImplemented from "../utils/NotImplemented.svelte";

  export let fields;
  export let data;
  export let table;
  export let condensed = false;

  const firstField = fields[0];

  let tab_is_open = false;
  function openTab() {
    if (tab_is_open) {
      return false;
    }
    else {
      tab_is_open = true;
      return true;
    }
  }

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

  // A function to decide whether an entry of a linked table should be displayed
  // in condensed form with bullet point or in full form. It was a really hard task
  // to reverse engineer this from EasyDB. So it might need more revisions if we
  // find counter examples.
  function decideCondense(field) {
    if (field.mask.fields.length === 1) {
      return true;
    }
    if (field.custom_settings.condensed_output) {
      return true;
    }
    return false;
  }
</script>

{#if fields.length > 0}
  {#if firstField.kind === "field" }
    <FieldDispatch field={firstField} data={data} table={table} condensed={condensed}/>
    <svelte:self fields={fields.slice(1)} data={data} table={table} condensed={condensed}/>
  {:else if firstField.kind === "linked-table" }
    {#if hasSubData(data, table, firstField)}
      {#if !condensed }
        <P class="pt-4">
          <FieldLabel field={firstField} table={firstField.other_table_name_hint}/>
        </P>
      {/if}
      <LinkedTable>
        <List>
          {#each linkedSubData(data, table, firstField) as subdata}
            <Li>
              <svelte:self fields={firstField.mask.fields} data={subdata} table={firstField.other_table_name_hint} condensed={decideCondense(firstField)} />
            </Li>
          {/each}
        </List>
      </LinkedTable>
    {/if}
    <svelte:self fields={fields.slice(1)} data={data} table={table} condensed={condensed}/>
  {:else if firstField.kind === "reverse-linked-table" }
    {#if hasReverseSubData(data, table, firstField) }
      <ReverseLinkedTable>
        {#each reverseLinkedSubData(data, table, firstField) as subdata }
          <svelte:self fields={firstField.mask.fields} data={subdata} table={firstField.other_table_name_hint} condensed={condensed}/>
        {/each}
      </ReverseLinkedTable>
    {/if}
    <svelte:self fields={fields.slice(1)} data={data} table={table} condensed={condensed}/>
  {:else if firstField.kind === "splitter" }
    {#if firstField.type === "panel-begin" }
      <Panel fields={fields.slice(0, findMatch("panel-begin", "panel-end"))} data={data} table={table}>
        <svelte:self fields={fields.slice(1, findMatch("panel-begin", "panel-end"))} data={data} table={table} condensed={condensed}/>
      </Panel>
      <svelte:self fields={fields.slice(findMatch("panel-begin", "panel-end") + 1)} data={data} table={table} condensed={condensed}/>
    {:else if firstField.type === "tabs-begin" }
      <Tabs fields={fields} data={data} table={table}>
        {#each findTabs() as tab}
          <TabItem fields={tab} data={data} table={table} open={openTab()}>
            <svelte:self fields={tab.slice(1)} data={data} table={table} condensed={condensed}/>
          </TabItem>
        {/each}
      </Tabs>
      <svelte:self fields={fields.slice(findMatch("tabs-begin", "tabs-end") + 1)} data={data} table={table} condensed={condensed}/>
    {:else if firstField.type === "split" }
      <Split field={firstField} data={data} table={table}/>
      <svelte:self fields={fields.slice(1)} data={data} table={table} condensed={condensed}/>
    {:else if firstField.type === "custom-begin" }
      <CustomSplitterDispatch field={firstField} data={data} table={table}/>
      <svelte:self fields={fields.slice(1)} data={data} table={table} condensed={condensed}/>
    {:else}
      <p>Splitter of type {firstField.type} not yet implemented.</p>
      <svelte:self fields={fields.slice(1)} data={data} table={table} condensed={condensed}/>
    {/if}
  {:else if firstField.kind === "link" }
    <Link field={firstField} data={data} table={table} condensed={condensed}/>
    <svelte:self fields={fields.slice(1)} data={data} table={table} condensed={condensed}/>
  {:else}
    <NotImplemented message="Mask element of kind {firstField.kind} not yet implemented" />
    <svelte:self fields={fields.slice(1)} data={data} table={table} condensed={condensed}/>
  {/if}
{/if}
