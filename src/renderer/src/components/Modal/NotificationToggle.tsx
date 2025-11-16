interface ToggleSwitchProps {
  checked: boolean;
  onChange?: () => void;
}

const ToggleSwitch = ({ checked, onChange }: ToggleSwitchProps) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-[18px] w-[34px] rounded-full transition ${checked ? 'bg-yellow-400' : 'bg-grey-100'} `}
    >
      <span
        className={`bg-grey-0 absolute top-2 left-2 h-[14px] w-[14px] rounded-full transition ${checked ? 'translate-x-[16px]' : ''} `}
      />
    </button>
  );
};

export default ToggleSwitch;
