import React from "react";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  label?: string;
};

export const Toggle = ({ checked, onChange, id, label }: ToggleProps) => {
  return (
    <label className="toggle-wrapper" htmlFor={id}>
      {label && <span className="toggle-label">{label}</span>}
      <div className={`toggle ${checked ? "checked" : ""}`}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider"></span>
      </div>
    </label>
  );
};
