<script>
  import { List } from "flowbite-svelte";

  export let bracket;

  import "./bracket.css";
</script>

<List class={bracket ? "bracket-list" : null}>
  <slot/>
</List>
