import * as React from 'react';

import { cn } from '@shared/lib/cn';

interface ExampleOverlayProps {
  label?: string;
  className?: string;
  pillClassName?: string;
  zIndex?: number;
  dimmed?: boolean;
  blur?: boolean;
  dimClassName?: string;
}

const ExampleOverlay = React.forwardRef<HTMLDivElement, ExampleOverlayProps>(
  (
    {
      label = '예시',
      className,
      pillClassName,
      zIndex = 50,
      dimmed = false,
      blur = false,
      dimClassName,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          dimmed
            ? cn(
              'bg-grey-0/60 dark:bg-black/60',
              blur ? 'backdrop-blur-[1px]' : '',
              dimClassName,
            )
            : '',
          className,
        )}
        style={{ zIndex, pointerEvents: 'none' }}
      >
        <div
          className={cn(
            'rounded-full bg-white px-6 py-1 text-[20px] font-semibold text-grey-600',
            pillClassName,
          )}
          style={{
            zIndex: zIndex + 10,
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.10)',
          }}
        >
          {label}
        </div>
      </div>
    );
  },
);

ExampleOverlay.displayName = 'ExampleOverlay';
export { ExampleOverlay };
