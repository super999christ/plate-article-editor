import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import {
  collapseSelection,
  focusEditor,
  getNodeEntries,
  isBlock,
  toggleNodeType,
  useEditorRef,
  useEditorSelector,
} from '@udecode/plate-common';

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
import { FONT_SIZE_18, FONT_SIZES } from '@/lib/plugins/createCustomFontPlugin';

const items = FONT_SIZES.map(fs => ({
  value: fs,
  label: fs.split("-").reverse().at(0) + 'px',
  description: fs.split("-").reverse().at(0) + 'px',
}))

const defaultItem = items.find((item) => item.value === FONT_SIZE_18)!;

export function FontSizeDropdownMenu(props: DropdownMenuProps) {
  const value: string = useEditorSelector((editor) => {
    let initialNodeType: string = FONT_SIZE_18;
    let allNodesMatchInitialNodeType = false;
    const codeBlockEntries = getNodeEntries(editor, {
      match: (n) => isBlock(editor, n),
      mode: 'highest',
    });
    const nodes = Array.from(codeBlockEntries);

    if (nodes.length > 0) {
      initialNodeType = nodes[0][0].type as string;
      allNodesMatchInitialNodeType = nodes.every(([node]) => {
        const type: string = (node?.type as string) || FONT_SIZE_18;

        return type === initialNodeType;
      });
    }

    return allNodesMatchInitialNodeType ? initialNodeType : FONT_SIZE_18;
  }, []);

  const editor = useEditorRef();
  const openState = useOpenState();

  const selectedItem =
    items.find((item) => item.value === value) ?? defaultItem;
  const { label: selectedItemLabel } = selectedItem;

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Font Size"
          isDropdown
          className="lg:min-w-[130px]"
        >
          <span className="max-lg:hidden">{selectedItemLabel}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-0 overflow-auto max-h-[450px]">
        <DropdownMenuLabel>Font Size</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          value={value}
          onValueChange={(type) => {
            toggleNodeType(editor, { activeType: type });
            collapseSelection(editor);
            focusEditor(editor);
          }}
        >
          {items.map(({ value: itemValue, label }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              value={itemValue}
              className="min-w-[180px]"
            >
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
