import React, { useRef, useState } from "react";

export const CurrencyInput = ({ value, onChange, id }: any) => {

  const formatNumber = (n: string) => {
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const cleanNumber = (n: string) => {
    console.log('cleaning: ', n);
    const clean = n.replaceAll(',', '');
    console.log('cleaned: ', clean);
    return clean;
  };

  const [saved, setSaved] = useState(formatNumber(value));

  // const displayValue = formatNumber(value);

  const inputRef = useRef(null);

  const handleChange = (e: any) => {
    const inputVal = e.target.value;
    // const inputLength = inputVal.length;
    // const caretPos = (inputRef.current as any).selectionStart;
    // if (inputVal === '') {
    //   setDisplayValue('');
    //   setVal('');
    // } else {

    // }
    setSaved(formatNumber(inputVal));
    onChange(cleanNumber(inputVal));
  };

  return (<div>
    <input
      id={id}
      value={saved}
      onChange={handleChange}
      ref={inputRef}
    />
  </div>);
};