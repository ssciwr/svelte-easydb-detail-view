<script>
// This is a no-op in svelte-easydb-detail-view. The reason is that the original
// is showing a help text that hints the user at an otherwise hard to find UI element
// in EasyDB. In our project, we control the UI, so we do not need such workarounds.

  let data;
  let field;
  let table;
</script>

<slot />
