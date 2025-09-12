import React, { useEffect, useState } from "react";

type CurrencyInputProps = {
  value: string | number;
  onChange: (val: string) => void;
  id?: string;
};

export const CurrencyInput = ({ value, onChange, id }: CurrencyInputProps) => {

  const formatNumber = (n: string|number) => {
    let number = typeof n === 'number' ? n.toString() : n;
    return number.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const cleanNumber = (n: string) => {
    const clean = n.replaceAll(',', '');
    return clean;
  };

  const [saved, setSaved] = useState(formatNumber(value));

  const handleChange = (e: any) => {
    const raw = e.target.value;
    const clean = cleanNumber(raw);
    setSaved(formatNumber(clean));
    onChange(clean);
  };

  useEffect(() => {
    setSaved(formatNumber(value));
  }, [value]);

  return (<>
    <input
      id={id}
      value={saved}
      onChange={handleChange}
      inputMode="numeric"
      pattern="[0-9]*"
    />
  </>);
};