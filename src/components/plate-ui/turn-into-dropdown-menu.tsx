import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import {
  collapseSelection,
  focusEditor,
  getNodeEntries,
  isBlock,
  toggleNodeType,
  useEditorRef,
  useEditorSelector,
} from '@udecode/plate-common';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

import { Icons } from '@/components/icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';
import { ELEMENT_S1, ELEMENT_S2, ELEMENT_S3, ELEMENT_S4, ELEMENT_S5, ELEMENT_S6 } from '@/lib/plugins/spacing';

const items = [
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
  }
];

const defaultItem = items.find((item) => item.value === ELEMENT_PARAGRAPH)!;

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const value: string = useEditorSelector((editor) => {
    let initialNodeType: string = ELEMENT_PARAGRAPH;
    let allNodesMatchInitialNodeType = false;
    const codeBlockEntries = getNodeEntries(editor, {
      match: (n) => isBlock(editor, n),
      mode: 'highest',
    });
    const nodes = Array.from(codeBlockEntries);

    if (nodes.length > 0) {
      initialNodeType = nodes[0][0].type as string;
      allNodesMatchInitialNodeType = nodes.every(([node]) => {
        const type: string = (node?.type as string) || ELEMENT_PARAGRAPH;

        return type === initialNodeType;
      });
    }

    return allNodesMatchInitialNodeType ? initialNodeType : ELEMENT_PARAGRAPH;
  }, []);

  const editor = useEditorRef();
  const openState = useOpenState();

  const selectedItem =
    items.find((item) => item.value === value) ?? defaultItem;
  const { icon: SelectedItemIcon, label: selectedItemLabel } = selectedItem;

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Turn into"
          isDropdown
          className="lg:min-w-[130px]"
        >
          <SelectedItemIcon className="size-5 lg:hidden" />
          <span className="max-lg:hidden">{selectedItemLabel}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-0">
        <DropdownMenuLabel>Turn into</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          value={value}
          onValueChange={(type) => {
            // if (type === 'ul' || type === 'ol') {
            //   if (settingsStore.get.checkedId(KEY_LIST_STYLE_TYPE)) {
            //     toggleIndentList(editor, {
            //       listStyleType: type === 'ul' ? 'disc' : 'decimal',
            //     });
            //   } else if (settingsStore.get.checkedId('list')) {
            //     toggleList(editor, { type });
            //   }
            // } else {
            //   unwrapList(editor);
            toggleNodeType(editor, { activeType: type });
            // }

            collapseSelection(editor);
            focusEditor(editor);
          }}
        >
          {items.map(({ value: itemValue, label, icon: Icon }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              value={itemValue}
              className="min-w-[180px]"
            >
              <Icon className="mr-2 size-5" />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
