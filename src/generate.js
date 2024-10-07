import { writeFile } from 'fs/promises';
import { accessInstance } from './lib/easydbData.js';
import { Command, Flags } from '@oclif/core';


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

    await writeFile('src/lib/easydbPregen.js', `export const pregen_instance = "${instance}";`);

    try {
      await writeFile('public/pregen/data.json', JSON.stringify(data));
      console.log('Successfully regenerated the EasyDB data.');
    } catch (error) {
      console.error('Error writing the EasyDB data:', error);
    }
  }
}

PrefetchCommand.run();
