<script>
  import { fieldData } from "../../lib/easydbHelpers";
  import { dataLanguagesStore } from "../../lib/stores";
  import { orderLanguages } from "../../lib/l10n";

  import { Table, TableBody, TableBodyRow, TableBodyCell } from "flowbite-svelte";

  export let data;
  export let field;
  export let table;

  const fdata = fieldData(data, table, field);
</script>

<Table class="table-fixed">
  <TableBody>
    {#each orderLanguages(Object.keys(fdata), $dataLanguagesStore) as lang}
      <TableBodyRow>
        <TableBodyCell>
          <span class="easydb-oneline-l10n-text-field">{fdata[lang]}</span>
        </TableBodyCell>
        <TableBodyCell class="w-1/4">
          <span class="easydb-oneline-l10n-language-code">{lang}</span>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
