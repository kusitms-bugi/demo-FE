import * as React from 'react';
import { cn } from '../../utils/cn';

interface NotificationToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const NotificationToggleSwitch = React.forwardRef<
  HTMLButtonElement,
  NotificationToggleSwitchProps
>(({ checked, onChange }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-[18px] w-[34px] cursor-pointer items-center rounded-full px-[3px] py-[2px] transition-colors duration-200 ease-in-out',
        checked ? 'bg-yellow-400' : 'bg-grey-100',
      )}
    >
      <span
        className={cn(
          'inline-block h-[14px] w-[14px] transform rounded-full bg-white transition-transform duration-200 ease-in-out',
          checked ? 'translate-x-[14px]' : '',
        )}
      />
    </button>
  );
});

NotificationToggleSwitch.displayName = 'NotificationToggleSwitch';
export { NotificationToggleSwitch };
