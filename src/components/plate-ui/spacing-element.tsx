import React from 'react';
import { withRef, withVariants } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common';
import { cva } from 'class-variance-authority';

const spacingClassNames = {
  s1: 'my-0 h-[80px] min-w-[40px] text-white bg-blue-900 text-[40px] pt-3',
  s2: 'my-0 h-[64px] min-w-[40px] text-white bg-blue-700 text-[32px] pt-3',
  s3: 'my-0 h-[40px] min-w-[40px] text-white bg-green-900 text-[24px] pt-2',
  s4: 'my-0 h-[24px] min-w-[40px] text-white bg-green-700 text-[12px]',
  s5: 'my-0 h-[16px] min-w-[40px] text-white bg-red-900 text-[8px]',
  s6: 'my-0 h-[8px] min-w-[40px] text-white bg-red-700 text-[6px]',
};

const spacingHeights = {
  s1: '80px',
  s2: '64px',
  s3: '40px',
  s4: '24px',
  s5: '16px',
  s6: '8px'
};

const spacingVariants = cva('', {
  variants: {
    variant: spacingClassNames
  },
});

const SpacingElementVariants = withVariants(PlateElement, spacingVariants, [
  'variant',
]);

export const SpacingElement = withRef<typeof SpacingElementVariants>(
  ({ variant = 's1', children, ...props }, ref) => {
    const Element = 'div';
    const className = spacingClassNames[variant || 's1'];

    return (
      <SpacingElementVariants
        ref={ref}
        asChild
        variant={variant}
        {...props}
      >
        <Element className={className}>{children}</Element>
      </SpacingElementVariants>
    );
  }
);
