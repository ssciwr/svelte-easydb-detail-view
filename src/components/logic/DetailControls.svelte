<script>
  import { appLanguageStore, popSystemID, systemidStore, viewerPanelStateStore } from "../../lib/stores";

  import { Button, ButtonGroup, Tooltip } from "flowbite-svelte";
  import { BackwardStepOutline, ImageOutline, RectangleListOutline } from "flowbite-svelte-icons";

  export let data;

  const l10n = {
    "assettext": {
      "de-DE": "Asset Viewer",
      "en-US": "Asset Viewer",
    },
    "hierarchytext": {
      "de-DE": "Objekt-Hierarchie",
      "en-US": "Object Hierarchy",
    },
    "maptext": {
      "de-DE": "Karte",
      "en-US": "Map",
    },
    "returntext": {
      "de-DE": "Zurück zu Objekt ",
      "en-US": "Return to object ",
    },
  };

  function hasRelations() {
    if(data._has_children) {
      return true;
    }
    if(!("_path" in data)) {
      return false;
    }
    if(data._path.length > 1) {
      return true;
    }
    return false;
  }

  function calculate(ids) {
    let ret = [];

    if(ids.length > 1) {
      ret.push("back");
    }

    if(hasRelations()) {
      ret.push("hierarchy");
    }

    return ret
  }

  $: displayedButtons = calculate($systemidStore);
</script>

{#if displayedButtons.length > 0}
  <ButtonGroup class="pb-2">
    {#if displayedButtons.includes("back")}
      <Button id="back-nav" on:click={popSystemID}>
        <BackwardStepOutline class="inline-block w-6 h-6"/>
      </Button>
      <Tooltip triggeredBy="#back-nav" placement="bottom" class="z-10">
        {l10n.returntext[$appLanguageStore]}{$systemidStore.at(-2)}
      </Tooltip>
    {/if}
    {#if displayedButtons.includes("hierarchy")}
      <Button id="hierarchy-nav" on:click={() => { viewerPanelStateStore.set("hierarchy"); }}>
        <RectangleListOutline class="inline-block w-6 h-6"/>
      </Button>
      <Tooltip triggeredBy="#hierarchy-nav" placement="bottom" class="z-10">
        {l10n.hierarchytext[$appLanguageStore]}
      </Tooltip>
    {/if}
    <Button id="assets-nav" on:click={() => { viewerPanelStateStore.set("asset"); }}>
      <ImageOutline class="inline-block w-6 h-6"/>
    </Button>
    <Tooltip triggeredBy="#assets-nav" placement="bottom" class="z-10">
      {l10n.assettext[$appLanguageStore]}
    </Tooltip>
  </ButtonGroup>
{/if}
