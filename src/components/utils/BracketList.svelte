<script>
  import { List } from "flowbite-svelte";
</script>

<style>
  .bracket-list {
    list-style-type: none;
    padding-left: 1.5rem;
  }
  .bracket-list li::before {
    content: "";
    position: absolute;
    left: -2rem; /* Positioning the border to the left of the list item */
    top: 0;
    bottom: 0;
    border-left: 2px solid black; /* Non-continuous border styling */
    height: 2rem; /* Height of the bracket line */
    margin-top: 0.5rem; /* Centering the line vertically */
  }
  .bracket-list li {
    position: relative;
    margin-left: 1rem;
  }
</style>

<List>
  <div class="bracket-list">
    <slot />
  </div>
</List>
