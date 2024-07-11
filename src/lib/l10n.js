const language_priority = ["de-DE", "en-US"];

// Select the best language from the given data
export function bestLanguage(data, lang) {
  // If the selected language exists, we take it
  if (lang in data) {
    return data[lang];
  }

  // Otherwise we select the language with the highest priority
  for (let l in language_priority) {
    if (l in data)
      return data[l];
  }

  // Finally, we select any language that we can find
  return Object.values(data)[0];
}