'use client';

import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import {
  focusEditor,
  insertEmptyElement,
  useEditorRef,
} from '@udecode/plate-common';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import { Icons } from '@/components/icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';
import { ELEMENT_TABLE } from '@udecode/plate-table';
import { ELEMENT_HR } from '@udecode/plate-horizontal-rule';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import { ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED } from '@udecode/plate-media';
import { ELEMENT_EXCALIDRAW } from '@udecode/plate-excalidraw';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { ELEMENT_S1, ELEMENT_S2, ELEMENT_S3, ELEMENT_S4, ELEMENT_S5, ELEMENT_S6 } from '@/lib/plugins/spacing';

const items = [
  {
    label: 'Basic blocks',
    items: [
      {
        value: ELEMENT_PARAGRAPH,
        label: 'Paragraph',
        description: 'Paragraph',
        icon: Icons.paragraph,
      },
      {
        value: ELEMENT_H1,
        label: 'Heading 1',
        description: 'Heading 1',
        icon: Icons.h1,
      },
      {
        value: ELEMENT_H2,
        label: 'Heading 2',
        description: 'Heading 2',
        icon: Icons.h2,
      },
      {
        value: ELEMENT_H3,
        label: 'Heading 3',
        description: 'Heading 3',
        icon: Icons.h3,
      },
      {
        value: ELEMENT_H4,
        label: 'Heading 4',
        description: 'Heading 4',
        icon: Icons.h4,
      },
      {
        value: ELEMENT_H5,
        label: 'Heading 5',
        description: 'Heading 5',
        icon: Icons.h5,
      },
      {
        value: ELEMENT_S1,
        label: 'Spacing 1 <80px>',
        description: 'Spacing 1 <80px>',
        icon: Icons.s1,
      },
      {
        value: ELEMENT_S2,
        label: 'Spacing 2 <64px>',
        description: 'Spacing  <64px>',
        icon: Icons.s2,
      },
      {
        value: ELEMENT_S3,
        label: 'Spacing 3 <40px>',
        description: 'Spacing 3 <40px>',
        icon: Icons.s3,
      },
      {
        value: ELEMENT_S4,
        label: 'Spacing 4 <24px>',
        description: 'Spacing 4 <24px>',
        icon: Icons.s4,
      },
      {
        value: ELEMENT_S5,
        label: 'Spacing 5 <16px>',
        description: 'Spacing 5 <16px>',
        icon: Icons.s5,
      },
      {
        value: ELEMENT_S6,
        label: 'Spacing 6 <8px>',
        description: 'Spacing 6 <8px>',
        icon: Icons.s6,
      },
      {
        value: ELEMENT_BLOCKQUOTE,
        label: 'Quote',
        description: 'Quote (⌘+⇧+.)',
        icon: Icons.blockquote,
      },
      {
        value: ELEMENT_TABLE,
        label: 'Table',
        description: 'Table',
        icon: Icons.table,
      },
      {
        value: 'ul',
        label: 'Bulleted list',
        description: 'Bulleted list',
        icon: Icons.ul,
      },
      {
        value: 'ol',
        label: 'Numbered list',
        description: 'Numbered list',
        icon: Icons.ol,
      },
      {
        value: ELEMENT_HR,
        label: 'Divider',
        description: 'Divider (---)',
        icon: Icons.minus,
      },
    ],
  },
  {
    label: 'Media',
    items: [
      {
        value: ELEMENT_CODE_BLOCK,
        label: 'Code',
        description: 'Code (```)',
        icon: Icons.codeblock,
      },
      {
        value: ELEMENT_IMAGE,
        label: 'Image',
        description: 'Image',
        icon: Icons.image,
      },
      {
        value: ELEMENT_MEDIA_EMBED,
        label: 'Embed',
        description: 'Embed',
        icon: Icons.video,
      },
      // {
      //   value: ELEMENT_EXCALIDRAW,
      //   label: 'Excalidraw',
      //   description: 'Excalidraw',
      //   icon: Icons.logo,
      // },
    ],
  },
  {
    label: 'Inline',
    items: [
      {
        value: ELEMENT_LINK,
        label: 'Link',
        description: 'Link',
        icon: Icons.link,
      },
    ],
  },
];

export function InsertDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Insert" isDropdown>
          <Icons.add />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="flex max-h-[500px] min-w-0 flex-col gap-0.5 overflow-y-auto"
      >
        {items.map(({ items: nestedItems, label }, index) => (
          <React.Fragment key={label}>
            {index !== 0 && <DropdownMenuSeparator />}

            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            {nestedItems.map(
              ({ value: type, label: itemLabel, icon: Icon }) => (
                <DropdownMenuItem
                  key={type}
                  className="min-w-[180px]"
                  onSelect={async () => {
                    switch (type) {
                      // case ELEMENT_CODE_BLOCK: {
                      //   insertEmptyCodeBlock(editor);
                      //
                      //   break;
                      // }
                      // case ELEMENT_IMAGE: {
                      //   await insertMedia(editor, { type: ELEMENT_IMAGE });
                      //
                      //   break;
                      // }
                      // case ELEMENT_MEDIA_EMBED: {
                      //   await insertMedia(editor, {
                      //     type: ELEMENT_MEDIA_EMBED,
                      //   });
                      //
                      //   break;
                      // }
                      // case 'ul':
                      // case 'ol': {
                      //   insertEmptyElement(editor, ELEMENT_PARAGRAPH, {
                      //     select: true,
                      //     nextBlock: true,
                      //   });
                      //
                      //   if (settingsStore.get.checkedId(KEY_LIST_STYLE_TYPE)) {
                      //     toggleIndentList(editor, {
                      //       listStyleType: type === 'ul' ? 'disc' : 'decimal',
                      //     });
                      //   } else if (settingsStore.get.checkedId('list')) {
                      //     toggleList(editor, { type });
                      //   }
                      //
                      //   break;
                      // }
                      // case ELEMENT_TABLE: {
                      //   insertTable(editor);
                      //
                      //   break;
                      // }
                      // case ELEMENT_LINK: {
                      //   triggerFloatingLink(editor, { focused: true });
                      //
                      //   break;
                      // }
                      default: {
                        insertEmptyElement(editor, type, {
                          select: true,
                          nextBlock: true,
                        });
                      }
                    }

                    focusEditor(editor);
                  }}
                >
                  <Icon className="mr-2 size-5" />
                  {itemLabel}
                </DropdownMenuItem>
              )
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
