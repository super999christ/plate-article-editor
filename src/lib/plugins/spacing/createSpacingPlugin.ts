import {
  type PlatePlugin,
  createPluginFactory,
  onKeyDownToggleElement,
} from '@udecode/plate-common';

import type { SpacingPlugin, SpacingsPlugin } from './types';

import { KEYS_SPACING } from './constants';

export const KEY_SPACING = 'spacing';

/** Enables support for spacings with configurable levels (from 1 to 6). */
export const createSpacingPlugin = createPluginFactory<SpacingsPlugin>({
  key: KEY_SPACING,
  options: {
    levels: [1, 2, 3, 4, 5, 6],
  },
  then: (editor, { options: { levels } = {} }) => {
    const plugins: PlatePlugin<SpacingPlugin>[] = [];

    const spacingLevels = Array.isArray(levels)
      ? levels
      : Array.from({ length: levels || 6 }, (_, i) => i + 1);

    spacingLevels.forEach((level) => {
      const key = KEYS_SPACING[level - 1];

      const plugin: PlatePlugin<SpacingPlugin> = {
        deserializeHtml: {
          rules: [
            {
              validNodeName: `S${level}`,
            },
          ],
        },
        handlers: {
          onKeyDown: onKeyDownToggleElement,
        },
        isElement: true,
        key,
        options: {},
      };

      plugins.push(plugin);
    });

    return {
      plugins,
    };
  },
});
