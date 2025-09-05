<script>
  import { fieldData } from "../../lib/easydbHelpers";
  import { getContext } from 'svelte';
  import { orderLanguages } from "../../lib/l10n";

  import { P, Table, TableBody, TableBodyRow, TableBodyCell } from "flowbite-svelte";

  // Get stores from context
  const stores = getContext('stores');
  const { dataLanguagesStore } = stores;

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
          <P class="w-full">
            <span class="easydb-oneline-l10n-text-field">{fdata[lang]}</span>
          </P>
        </TableBodyCell>
        <TableBodyCell class="w-1/4">
          <span class="easydb-oneline-l10n-language-code">{lang}</span>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
