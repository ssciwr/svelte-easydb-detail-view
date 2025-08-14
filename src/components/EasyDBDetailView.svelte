<svelte:options customElement='easydb-detail-view' />

<script>
  import '../app.pcss';
  import { createIsolatedStores } from '../lib/createIsolatedStores';
  import { pregen_instance } from '../lib/easydbPregen';
  import DetailViewImpl from './logic/DetailViewImpl.svelte';
  import Waiting from './utils/Waiting.svelte';

  export let systemid = "";
  export let appLanguage = "de-DE";
  export let dataLanguages = ["de-DE", "en-US"];
  export let easydbInstance = pregen_instance;
  export let mask = "";
  export let masksToRender = [];
  export let token = "";
  export let seededInitialId = ""; // Unique seed for this component instance
  
  // Generate unique seed if not provided
  const componentSeed = seededInitialId || `easydb-${Math.random().toString(36).substr(2, 9)}`;
  console.log(`🧪 [EasyDBDetailView] Component seed: ${componentSeed}, systemid: ${systemid}, seededInitialId: ${seededInitialId}`);
  
  // Create isolated store instances for this component with seeded SystemID
  const stores = createIsolatedStores(componentSeed, systemid);
  console.log(`🧪 [EasyDBDetailView] Created stores:`, stores);
  const {
    appLanguageStore,
    dataLanguagesStore,
    systemidStore,
    currentSystemId,
    easydbInstanceStore,
    userTokenStore,
    easydbInstanceDataStore,
    systemIdStoreInterface
  } = stores;

  // Update stores when props change
  $: {
    console.log(`🧪 [EasyDBDetailView] Setting appLanguage: ${appLanguage}`);
    appLanguageStore.set(appLanguage);
  }
  $: {
    console.log(`🧪 [EasyDBDetailView] Setting dataLanguages:`, dataLanguages);
    dataLanguagesStore.set(dataLanguages);
  }
  $: {
    console.log(`🧪 [EasyDBDetailView] Setting easydbInstance: ${easydbInstance}`);
    easydbInstanceStore.set(easydbInstance);
  }
  // SystemID is managed by seeded store - only update if it's different from current
  $: if (systemid && systemid !== $currentSystemId) {
    console.log(`🧪 [EasyDBDetailView] Setting systemID: ${systemid}, current: ${$currentSystemId}`);
    systemIdStoreInterface.setSystemIdStack([systemid]);
  }
  $: {
    console.log(`🧪 [EasyDBDetailView] Setting token: ${token}`);
    userTokenStore.set(token);
  }
  
  // Create resolved masksToRender value
  $: resolvedMasksToRender = masksToRender.length === 0 
    ? ($easydbInstanceDataStore?.masks ? Object.keys($easydbInstanceDataStore.masks) : [])
    : masksToRender;
  
  // Debug reactive statements for template state
  $: if (!$easydbInstanceDataStore || ($easydbInstanceDataStore && $easydbInstanceDataStore.instance !== easydbInstance)) {
    console.log(`🧪 [EasyDBDetailView] WAITING - easydbInstanceDataStore:`, $easydbInstanceDataStore);
    console.log(`🧪 [EasyDBDetailView] WAITING - easydbInstance:`, easydbInstance);
  } else {
    console.log(`🧪 [EasyDBDetailView] LOADED - easydbInstanceDataStore:`, $easydbInstanceDataStore);
  }
  
  // Pass stores, masksToRender and seeded ID to children through context
  import { setContext } from 'svelte';
  setContext('stores', stores);
  setContext('masksToRender', resolvedMasksToRender);
  setContext('seededInitialId', componentSeed);
</script>

{#if !$easydbInstanceDataStore || ($easydbInstanceDataStore && $easydbInstanceDataStore.instance !== easydbInstance)}
  <Waiting>
    Accessing the EasyDB instance...
  </Waiting>
{:else}
  <DetailViewImpl {mask} systemid={$currentSystemId}/>
{/if}