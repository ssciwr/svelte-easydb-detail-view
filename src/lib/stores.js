import { derived, get, writable } from "svelte/store";
import { accessInstance } from "./easydbData";
import { pregen_instance } from "./easydbPregen";

// A derived store that resolves a promise
function derivedPromise(store) {
  return derived(store, ($store, set) => {
    $store.then(value => {
      set(value);
    });
  });
}

// Our pregenerated defaults wrapped in a Promise
async function pregenDefaults() {
  const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '');
  const response = await fetch(`${baseUrl}/pregen/data.json`);
  return response.json();
}

// This manages the global state of the current app language
export const appLanguageStore = writable(null);

// This manages the global state of the current data language
export const dataLanguagesStore = writable(null);

// This manages the global state of the currently shown object System ID
// It is organized as a stack to allow for back navigation
export const systemidStore = writable([]);

// This manages the global state of the EasyDB instance we are talking to
export const easydbInstanceStore = writable(null);

// A derived store that delivers a promise.
export const easydbInstanceDataPromiseStore = derived(
  easydbInstanceStore,
  ($instance) => {
    if (($instance === null) || ($instance === pregen_instance)) {
      return pregenDefaults();
    }
    return accessInstance($instance);
  }
);

export const userTokenStore = writable("");

export const easydbTokenPromiseStore = derived(
  easydbInstanceStore,
  ($instance, set) => {
    if ($instance === null) {
      return;
    }
    fetch(`${$instance}/api/session`).then(
      response => {
        response.json().then(
          response_json => {
            const token = response_json.token;
            fetch(
              `${get(easydbInstanceStore)}/api/session/authenticate?` +
              new URLSearchParams({
                token: token,
                method: 'anonymous',
              }),
              {
                method: 'POST',
              }
            ).then(
              auth_response =>  { set(new Promise((resolve, reject) => { resolve(token);})) }
            );
          }
        );
      }
    )
  }
);

// A derived store that awaits above promise. It would be better to not even
// expose the promise store, but I did not get this to work without the explicit
// await in EasyDBDetailView.svelte.
export const easydbInstanceDataStore = derivedPromise(easydbInstanceDataPromiseStore);

// A store that stores what we currently are displaying in the asset viewer.
// Possible values are "hierarchy", "asset" and "map" (currently).
export const viewerPanelStateStore = writable("asset");

// A helper function to add a new System ID to the store and reset relevant other stores
export function pushSystemID(systemid) {
  systemidStore.update(systemids => [...systemids, systemid]);
  viewerPanelStateStore.set("asset");
}

export function popSystemID() {
  systemidStore.update(systemids => systemids.slice(0, -1));
  viewerPanelStateStore.set("asset");
}

// A store for the user given choice of which masks to render
export const userGivenMasksToRenderStore = writable([]);

// The list of masks that should be rendered in the component
export const masksToRenderStore = derived(
  [userGivenMasksToRenderStore, easydbInstanceDataStore],
  ([$userGivenMasksToRenderStore, $easydbInstanceDataStore]) => {
    if ($easydbInstanceDataStore === undefined) {
      return [];
    }
    if ($userGivenMasksToRenderStore.length === 0) {
      if ($easydbInstanceDataStore.masks === null) {
        return [];
      }
      return Object.keys($easydbInstanceDataStore.masks);
    }
    return $userGivenMasksToRenderStore;
  }
);
