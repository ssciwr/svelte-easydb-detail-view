import { writeFile } from 'fs/promises';
import { accessInstance } from './lib/easydbData.js';
import { Command, Flags } from '@oclif/core';

// This "trick" is super-unfortunate, but Svelte Preprocessing is fully regex-based
// and any attempts to pass stringified data that contains backslashes will result in
// a particularly bad instance of Regex hell. We therefore resort to doing this in
// the serialization and ondoing it in the deserialization as part of the injected code.
function escape(str) {
  return str.replaceAll("\\\"", "__ESCAPED_QUOTES__").replaceAll("\\", "__BACKSLASH__");
}

function useMask(name, include_mask, exclude_mask) {
  if (include_mask) {
    return include_mask.includes(name);
  } else if (exclude_mask) {
    return !exclude_mask.includes(name);
  }
  return true;
}

function filterMasks(masks, include_mask, exclude_mask) {
  return Object.fromEntries(
    Object.entries(masks).filter(([name, mask]) => useMask(name, include_mask, exclude_mask))
  );
}

export class PrefetchCommand extends Command {
  static description = 'Prefetch data from an EasyDB instance and hardcode it into your bundle.';

  static flags = {
    instance: Flags.string({
      description: 'The EasyDB instance to prefetch data from',
      required: true,
    }),
    exclude_mask: Flags.string({
      description: 'A mask to exclude from the prefetch',
      multiple: true,
      exclusive: ['include_mask'],
    }),
    include_mask: Flags.string({
      description: 'A mask to include in the prefetch',
      multiple: true,
      exclusive: ['exclude_mask'],
    }),
    token: Flags.string({
      description: 'A session token to use for the prefetch',
    }),
  }

  async run() {
    const { flags } = await this.parse(PrefetchCommand);
    const instance = flags.instance;

    const data = await accessInstance(instance, flags.token);

    data.masks = filterMasks(data.masks, flags.include_mask, flags.exclude_mask);

    // Inject the data into the Svelte component as a constant
    const content =
      `export const pregen_instance = '${instance}';\n` +
      `export const pregen_masks = JSON.parse('${escape(JSON.stringify(data.masks))}'.replaceAll("__ESCAPED_QUOTES__", "\\\\\\"").replaceAll("__BACKSLASH__", "\\\\"));\n` +
      `export const pregen_l10n = JSON.parse('${escape(JSON.stringify(data.l10n))}'.replaceAll("__ESCAPED_QUOTES__", "\\\\\\"").replaceAll("__BACKSLASH__", "\\\\"));\n` +
      `export const pregen_schemas = JSON.parse('${escape(JSON.stringify(data.schemas))}'.replaceAll("__ESCAPED_QUOTES__", "\\\\\\"").replaceAll("__BACKSLASH__", "\\\\"));\n`;

    try {
      await writeFile('src/lib/easydbPregen.js', content);
      console.log('Successfully regenerated the EasyDB data.');
    } catch (error) {
      console.error('Error writing the EasyDB data:', error);
    }
  }
}

PrefetchCommand.run();
