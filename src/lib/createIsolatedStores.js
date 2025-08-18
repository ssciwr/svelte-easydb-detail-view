// createIsolatedStores.js - Factory function to create isolated store instances
import { writable, derived, get } from 'svelte/store';
import { accessInstance } from './easydbData';
import { pregen_instance } from './easydbPregen';
import { getSeededSystemIdStore } from './seededSystemIdStore';

// Helper: derived store that resolves promises
function derivedPromise(store) {
  return derived(store, ($store, set) => {
    if ($store && typeof $store.then === 'function') {
      $store.then(value => set(value)).catch(err => {
        console.error('Promise resolution failed:', err);
        set(undefined);
      });
    } else {
      set($store);
    }
  });
}

// Helper: fetch pregenerated defaults from bundled data
async function pregenDefaults() {
  try {
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '');
    const response = await fetch(`${baseUrl}/pregen/data.json`);
    return response.json();
  } catch (err) {
    console.error('Failed to fetch pregen defaults:', err);
    return null;
  }
}


// Factory function to create isolated store instances
export function createIsolatedStores(seedKey = null, initialSystemId = "") {
  console.log(`🧪 [createIsolatedStores] Called with seedKey: ${seedKey}, initialSystemId: ${initialSystemId}`);
  
  // Create base stores
  const appLanguageStore = writable(null);
  const dataLanguagesStore = writable(null);
  
  // Use seeded SystemID store if seedKey provided, otherwise use regular isolated store
  let systemIdStoreInterface;
  if (seedKey) {
    systemIdStoreInterface = getSeededSystemIdStore(seedKey, initialSystemId);
  } else {
    // Fallback: create a basic isolated systemId store
    const basicSystemIdStore = writable(initialSystemId ? [initialSystemId] : []);
    systemIdStoreInterface = {
      systemIdStack: basicSystemIdStore,
      currentSystemId: derived(basicSystemIdStore, ($stack) => $stack.at(-1) || ""),
      pushSystemID: (id) => basicSystemIdStore.update(stack => [...stack, id]),
      popSystemID: () => basicSystemIdStore.update(stack => stack.length > 1 ? stack.slice(0, -1) : stack),
      setSystemIdStack: (stack) => basicSystemIdStore.set(stack)
    };
  }
  
  const easydbInstanceStore = writable(null);
  const userTokenStore = writable("");
  const viewerPanelStateStore = writable("asset");
  
  // Create derived stores
  const easydbInstanceDataPromiseStore = derived(
    easydbInstanceStore,
    ($instance) => {
      console.log(`🧪 [createIsolatedStores] easydbInstanceDataPromiseStore derived called with instance: ${$instance}, pregen_instance: ${pregen_instance}`);
      
      if (($instance === null) || ($instance === pregen_instance)) {
        console.log(`🧪 [createIsolatedStores] Using pregenDefaults for instance: ${$instance}`);
        const pregenPromise = pregenDefaults();
        pregenPromise.then(data => console.log(`🧪 [createIsolatedStores] Pregen data loaded:`, data))
                    .catch(err => console.error(`🧪 [createIsolatedStores] Pregen data failed:`, err));
        return pregenPromise;
      }
      console.log(`🧪 [createIsolatedStores] Using accessInstance for real instance: ${$instance}`);
      return accessInstance($instance);
    }
  );
  
  const easydbTokenPromiseStore = derived(
    easydbInstanceStore,
    ($instance) => {
      console.log("🔍 [Token] Creating token promise for instance:", $instance);
      
      if ($instance === null) {
        console.error("Could not fetch token due to undefined instance!", $instance)
        return Promise.resolve("");
      }
      
      console.log("Instance defined, so fetching token")
      
      // Return a single promise that resolves only after full authentication
      return fetch(`${$instance}/api/session`)
        .then(response => {
          console.log("🔍 [Token] Session response status:", response.status);
          if (!response.ok) {
            throw new Error(`Session request failed: ${response.status}`);
          }
          return response.json();
        })
        .then(response_json => {
          console.log("🔍 [Token] Session response JSON:", response_json);
          const token = response_json.token;
          console.log("🔍 [Token] Extracted token:", token);
          
          if (!token) {
            throw new Error("No token received from session endpoint");
          }
          
          // Now authenticate the token and only resolve after this completes
          return fetch(
            `${$instance}/api/session/authenticate?` +
            new URLSearchParams({
              token: token,
              method: 'anonymous',
            }),
            {
              method: 'POST',
            }
          ).then(auth_response => {
            console.log("🔍 [Token] Auth response status:", auth_response.status);
            if (!auth_response.ok) {
              throw new Error(`Authentication failed: ${auth_response.status}`);
            }
            console.log("🔍 [Token] Authentication successful, resolving with token:", token);
            return token; // Return the token only after authentication succeeds
          });
        })
        .catch(err => {
          console.error("🔍 [Token] Token fetch failed:", err);
          return ""; // Return empty string on error
        });
    }
  );
  
  const easydbInstanceDataStore = derivedPromise(easydbInstanceDataPromiseStore);
  
  // Helper functions for this store instance that also reset viewer panel
  function pushSystemID(systemid) {
    systemIdStoreInterface.pushSystemID(systemid);
    viewerPanelStateStore.set("asset");
  }
  
  function popSystemID() {
    systemIdStoreInterface.popSystemID();
    viewerPanelStateStore.set("asset");
  }
  
  return {
    // Base stores
    appLanguageStore,
    dataLanguagesStore,
    easydbInstanceStore,
    userTokenStore,
    viewerPanelStateStore,
    
    // SystemID store interface (seeded or basic)
    systemidStore: systemIdStoreInterface.systemIdStack,
    currentSystemId: systemIdStoreInterface.currentSystemId,
    
    // Derived stores
    easydbInstanceDataPromiseStore,
    easydbTokenPromiseStore,
    easydbInstanceDataStore,
    
    // Helper functions
    pushSystemID,
    popSystemID,
    
    // Direct access to seeded store interface
    systemIdStoreInterface,
    
    // Metadata
    seedKey: seedKey,
    initialSystemId: initialSystemId
  };
}