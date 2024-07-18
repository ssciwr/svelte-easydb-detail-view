import { derived, writable } from "svelte/store";
import { accessInstance } from "./easydbData";
import { pregen_instance, pregen_l10n, pregen_masks, pregen_schemas } from "./easydbPregen";

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
  return {
    instance: pregen_instance,
    masks: pregen_masks,
    schemas: pregen_schemas,
    l10n: pregen_l10n,
  };
}

// This manages the global state of the current app language
export const appLanguageStore = writable(null);

// This manages the global state of the current data language
export const dataLanguagesStore = writable(null);

// This manages the global state of the EasyDB instance we are talking to
export const easydbInstanceStore = writable(null);

// A derived store that delivers a promise.
export const easydbDataPromiseStore = derived(
  easydbInstanceStore,
  ($instance) => {
    if ($instance === pregen_instance) {
      return pregenDefaults();
    }
    return accessInstance($instance);
  }
);

// A derived store that awaits above promise. It would be better to not even
// expose the promise store, but I did not get this to work without the explicit
// await in EasyDBDetailView.svelte.
export const easydbDataStore = derivedPromise(easydbDataPromiseStore);
