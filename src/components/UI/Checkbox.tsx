import { useId, useState } from "react";

interface CheckBoxProps {
  initValue?: boolean;
  label?: string;
  onCheck?: (value: boolean) => void;
}

function CheckBox({ initValue = false, label, onCheck }: CheckBoxProps) {
  const [checked, setChecked] = useState(initValue);
  const id = useId();
  return (
    <div className="flex gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type="checkbox"
        name={id}
        id={id}
        checked={checked}
        onChange={() => {
          onCheck?.(!checked);
          setChecked((prev) => !prev);
        }}
      />
    </div>
  );
}

export default CheckBox;
