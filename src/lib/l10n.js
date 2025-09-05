const language_priority = ["de-DE", "en-US"];

// Select the best language from the given data
export function bestLanguage(data, lang) {
  // If the selected language exists, we take it
  for (let l of lang) {
    if ((l in data) && (data[l] !== "")) {
      return data[l];
    }
  }

  // Otherwise we select the language with the highest priority
  for (let l of language_priority) {
    if ((l in data) && (data[l] !== "")) {
      return data[l];
    }
  }

  // Finally, we select any language that we can find
  return Object.values(data)[0];
}

// Order the languages in a multi-language display
export function orderLanguages(available, chosen) {
  if (!chosen || chosen === null || chosen === undefined) {
    return [];
  }
  
  if (!Array.isArray(chosen)) {
    return [];
  }

  // The return data structure
  let ret = [];

  // First we iterate all the chosen languages and see whether they are available
  for (let chosen_lang of chosen) {
    if (chosen_lang in available) {
      ret.push(chosen_lang);
    }
  }

  // Then we iterate all those that are not chosen and append them
  for (let avail_lang of available) {
    if (!(avail_lang  in chosen)) {
      ret.push(avail_lang);
    }
  }

  return ret;
}
