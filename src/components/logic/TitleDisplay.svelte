<script>
  import { bestLanguage } from "../../lib/l10n";
  import { appLanguageStore, dataLanguagesStore, easydbInstanceDataStore } from "../../lib/stores";
  
  import { Breadcrumb, BreadcrumbItem, Card, P } from "flowbite-svelte";

  import StandardRendering from "./StandardRendering.svelte";

  export let data;
  export let table;

  console.log(data);
</script>

<div class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400 space-w-8 pt-6 pb-6">
  <Breadcrumb>
    {#each data._path.slice(0, -1) as item}
      <BreadcrumbItem>
        <StandardRendering data={item}/>
      </BreadcrumbItem>
    {/each}
  </Breadcrumb>
  <div class="pt-4 pb-4">
    <StandardRendering data={data}/>
    {$easydbInstanceDataStore.l10n[`schema.${table}.name`][$appLanguageStore]} #{data._system_object_id}
  </div>
  <Breadcrumb>
    {#each data[table]._pool._path.slice(1) as item}
      <BreadcrumbItem>
        {bestLanguage(item.pool.name, $dataLanguagesStore)}
      </BreadcrumbItem>
    {/each}
  </Breadcrumb>
</div>