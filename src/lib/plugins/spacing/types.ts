import type { HotkeyPlugin } from '@udecode/plate-common';

export interface SpacingPlugin extends HotkeyPlugin {}

export type SpacingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface SpacingsPlugin {
  /** Spacing levels supported from 1 to `levels` */
  levels?: SpacingLevel | SpacingLevel[];
}
