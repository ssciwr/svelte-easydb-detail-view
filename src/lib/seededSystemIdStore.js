// seededSystemIdStore.js - Isolated SystemID management with seeded keys
import { writable, derived, get } from 'svelte/store';

// Global registry of seeded systemID stores - each web component gets its own
const seededStoreRegistry = new Map();

/**
 * Creates or retrieves an isolated systemID store for a specific seed
 * @param {string} seedKey - Unique identifier for this component instance
 * @param {string} initialSystemId - Initial system ID to populate the store with
 * @returns {Object} Store interface with methods for this seeded instance
 */
export function getSeededSystemIdStore(seedKey, initialSystemId = "") {
  // If store already exists for this seed, return it
  if (seededStoreRegistry.has(seedKey)) {
    return seededStoreRegistry.get(seedKey);
  }

  // Create a new isolated store for this seed
  const systemIdStack = writable(initialSystemId ? [String(initialSystemId)] : []);
  
  // Derived store for current (latest) systemID
  const currentSystemId = derived(systemIdStack, ($stack) => {
    return $stack.length > 0 ? $stack.at(-1) : "";
  });

  // Navigation functions that operate only on this seeded instance
  function pushSystemID(systemid) {
    systemIdStack.update(stack => {
      // Ensure consistent string typing for systemIDs
      const normalizedSystemId = String(systemid);
      const newStack = [...stack, normalizedSystemId];
      console.log(`[SeededStore:${seedKey}] Pushed systemID ${systemid} (normalized to ${normalizedSystemId}), stack:`, newStack);
      return newStack;
    });
  }

  function popSystemID() {
    systemIdStack.update(stack => {
      if (stack.length <= 1) {
        // Don't pop the last item - always keep at least one
        console.log(`[SeededStore:${seedKey}] Cannot pop - only one item in stack:`, stack);
        return stack;
      }
      const newStack = stack.slice(0, -1);
      console.log(`[SeededStore:${seedKey}] Popped systemID, new stack:`, newStack);
      return newStack;
    });
  }

  function setSystemIdStack(newStack) {
    // Ensure all items in the stack are strings
    const normalizedStack = newStack.map(id => String(id));
    console.log(`[SeededStore:${seedKey}] Setting entire stack:`, normalizedStack);
    systemIdStack.set(normalizedStack);
  }

  function getCurrentSystemId() {
    return get(currentSystemId);
  }

  function getFullStack() {
    return get(systemIdStack);
  }

  // Store interface for this seeded instance
  const storeInterface = {
    // Writable stores
    systemIdStack,
    currentSystemId,
    
    // Navigation methods
    pushSystemID,
    popSystemID,
    setSystemIdStack,
    
    // Getters
    getCurrentSystemId,
    getFullStack,
    
    // Metadata
    seedKey,
    initialSystemId
  };

  // Register this store interface
  seededStoreRegistry.set(seedKey, storeInterface);
  
  console.log(`[SeededStore] Created new seeded store for key: ${seedKey}, initial: ${initialSystemId}`);
  
  return storeInterface;
}

/**
 * Debug function to see all registered seeded stores
 * @returns {Map} All registered stores
 */
export function getSeededStoreRegistry() {
  return seededStoreRegistry;
}

/**
 * Clear a specific seeded store (for cleanup)
 * @param {string} seedKey - Key of store to clear
 */
export function clearSeededStore(seedKey) {
  if (seededStoreRegistry.has(seedKey)) {
    seededStoreRegistry.delete(seedKey);
    console.log(`[SeededStore] Cleared seeded store for key: ${seedKey}`);
  }
}

/**
 * Clear all seeded stores (for complete reset)
 */
export function clearAllSeededStores() {
  seededStoreRegistry.clear();
  console.log(`[SeededStore] Cleared all seeded stores`);
}