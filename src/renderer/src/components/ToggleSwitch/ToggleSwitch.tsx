import * as React from 'react';
import { cn } from '../../utils/cn';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch = React.forwardRef<HTMLButtonElement, ToggleSwitchProps>(
  ({ checked, onChange }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'inline-flex h-[18px] w-[34px] items-center rounded-full px-[3px] transition-colors duration-300 ease-in-out',
          checked
            ? 'bg-yellow-400 hover:bg-yellow-500'
            : 'bg-grey-100 hover:bg-grey-200',
        )}
      >
        <span
          className={cn(
            'h-[14px] w-[14px] rounded-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-in-out',
            checked ? 'translate-x-[15px]' : 'translate-x-0',
          )}
        />
      </button>
    );
  },
);

ToggleSwitch.displayName = 'ToggleSwitch';
export { ToggleSwitch };
