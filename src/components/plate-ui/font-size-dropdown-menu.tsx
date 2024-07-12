'use client';

import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';
import { useCustomFontsizeDropdownMenu, useCustomFontsizeDropdownMenuState } from '@/lib/plugins/useCustomFontsizeDropdownMenu';

const items = ['8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px', '48px', '72px'];

export function FontSizeDropdownMenu({ children, ...props }: DropdownMenuProps) {
  const state = useCustomFontsizeDropdownMenuState();
  const { radioGroupProps } = useCustomFontsizeDropdownMenu(state);

  const openState = useOpenState();
  const FontValue =
    items.find((item) => item === radioGroupProps.value) ?? '18px';

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Font Size" isDropdown>
          {FontValue}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-0 max-h-[350px] overflow-auto">
        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          {...radioGroupProps}
        >
          {items.map((item) => (
            <DropdownMenuRadioItem key={item} value={item} hideIcon>
              {item}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
