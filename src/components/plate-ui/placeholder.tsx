import React from 'react';
import { cn } from '@udecode/cn';
import {
  createNodeHOC,
  createNodesHOC,
  PlaceholderProps,
  usePlaceholderState,
} from '@udecode/plate-common';
import { ELEMENT_H1 } from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_S1, ELEMENT_S2, ELEMENT_S3, ELEMENT_S4, ELEMENT_S5, ELEMENT_S6 } from '@/lib/plugins/spacing';

export const Placeholder = (props: PlaceholderProps) => {
  const { children, placeholder, nodeProps } = props;

  const { enabled } = usePlaceholderState(props);

  let customClassName = 'before:opacity-30';
  if (placeholder.includes("8px"))
    customClassName = "before:mt-[-8px] before:opacity-80";
  else if (placeholder.includes("Spacing"))
    customClassName = "before:mt-[-4px] before:opacity-80";

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      className: child.props.className,
      nodeProps: {
        ...nodeProps,
        className: cn(
          enabled &&
            `before:absolute before:cursor-text ${customClassName} before:content-[attr(placeholder)]`
        ),
        placeholder,
      },
    });
  });
};

export const withPlaceholder = createNodeHOC(Placeholder);
export const withPlaceholdersPrimitive = createNodesHOC(Placeholder);

export const withPlaceholders = (components: any) =>
  withPlaceholdersPrimitive(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: 'Type a paragraph',
      hideOnBlur: true,
      query: {
        maxLevel: 1,
      },
    },
    {
      key: ELEMENT_H1,
      placeholder: 'Untitled',
      hideOnBlur: false,
    },
    {
      key: ELEMENT_S1,
      placeholder: 'Spacing-80px',
      hideOnBlur: false,
    },
    {
      key: ELEMENT_S2,
      placeholder: 'Spacing-64px',
      hideOnBlur: false,
    },
    {
      key: ELEMENT_S3,
      placeholder: 'Spacing-40px',
      hideOnBlur: false,
    },
    {
      key: ELEMENT_S4,
      placeholder: 'Spacing-24px',
      hideOnBlur: false,
    },
    {
      key: ELEMENT_S5,
      placeholder: 'Spacing-16px',
      hideOnBlur: false,
    },
    {
      key: ELEMENT_S6,
      placeholder: 'Spacing-8px',
      hideOnBlur: false,
    },
  ]);
