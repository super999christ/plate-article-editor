import {
  ELEMENT_DEFAULT,
  HotkeyPlugin,
  createPluginFactory,
  getPluginType,
  mapInjectPropsToPlugin,
} from '@udecode/plate-common';
export interface CustomFontPlugin extends HotkeyPlugin {}

export type CustomFontLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

export interface CustomFontsPlugin {
  /** Heading levels supported from 1 to `levels` */
  levels?: CustomFontLevel | CustomFontLevel[];
}

export const KEY_FONTSIZE = 'font-size';
export const fontSizes = ['8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px', '48px', '72px'] as const;

export const createCustomFontSizePlugin = createPluginFactory({
  key: KEY_FONTSIZE,
  then: (editor) => ({
    inject: {
      props: {
        defaultNodeValue: '18px',
        nodeKey: KEY_FONTSIZE,
        styleKey: 'fontSize',
        validNodeValues: [...fontSizes],
        validTypes: [getPluginType(editor, ELEMENT_DEFAULT)],
      },
    }
  }),
});