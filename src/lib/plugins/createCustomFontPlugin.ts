import {
  HotkeyPlugin,
  PlatePlugin,
  createPluginFactory,
  someHtmlElement,
} from '@udecode/plate-common';

export interface CustomFontPlugin extends HotkeyPlugin {}

export type CustomFontLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

export interface CustomFontsPlugin {
  /** Heading levels supported from 1 to `levels` */
  levels?: CustomFontLevel | CustomFontLevel[];
}

export const FONT_SIZE_8 = 'font-size-8';
export const FONT_SIZE_9 = 'font-size-9';
export const FONT_SIZE_10 = 'font-size-10';
export const FONT_SIZE_11 = 'font-size-11';
export const FONT_SIZE_12 = 'font-size-12';
export const FONT_SIZE_14 = 'font-size-14';
export const FONT_SIZE_16 = 'font-size-16';
export const FONT_SIZE_18 = 'font-size-18';
export const FONT_SIZE_20 = 'font-size-20';
export const FONT_SIZE_22 = 'font-size-22';
export const FONT_SIZE_24 = 'font-size-24';
export const FONT_SIZE_26 = 'font-size-26';
export const FONT_SIZE_28 = 'font-size-28';
export const FONT_SIZE_36 = 'font-size-36';
export const FONT_SIZE_48 = 'font-size-48';
export const FONT_SIZE_72 = 'font-size-72';

export const FONT_SIZES = [
  FONT_SIZE_8,
  FONT_SIZE_9,
  FONT_SIZE_10,
  FONT_SIZE_11,
  FONT_SIZE_12,
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_18,
  FONT_SIZE_20,
  FONT_SIZE_22,
  FONT_SIZE_24,
  FONT_SIZE_26,
  FONT_SIZE_28,
  FONT_SIZE_36,
  FONT_SIZE_48,
  FONT_SIZE_72,
];

const KEY_FONTSIZE = 'font-size';

/** Enables support for underline formatting. */
export const createCustomFontPlugin = createPluginFactory<CustomFontsPlugin>({
  key: KEY_FONTSIZE,
  options: {
    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  },
  then: (editor, { options: { levels } = {} }) => {
    const plugins: PlatePlugin<CustomFontPlugin>[] = [];

    const headingLevels = Array.isArray(levels)
      ? levels
      : Array.from({ length: levels || 16 }, (_, i) => i + 1);

    headingLevels.forEach((level) => {
      const key = FONT_SIZES[level - 1];

      const plugin: PlatePlugin<CustomFontPlugin> = {
        deserializeHtml: {
          query: (el) =>
            !someHtmlElement(el, (node) => node.style.textDecoration === 'none'),
          rules: [
            {
              validNodeName: ['U'],
            },
            {
              validStyle: {
                textDecoration: ['underline'],
              },
            },
          ],
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
