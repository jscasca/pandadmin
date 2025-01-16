import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AxiosContext } from "../AxiosContext";

import './Autocomplete.css';

type Suggestion = {
  name: string;
  street: string;
}

type Props = {
  id?: string;
  disabled?: boolean;
  value: string;
  onChange: (evt: any ) => void;
  onSelect: (s: any) => void;
  suggestionFn?: (o: any) => string;
  fetchUrl: string;
  delay?: number;
};

export const Autocomplete = ({ 
  id,
  disabled = false,
  value,
  onChange,
  onSelect,
  suggestionFn = (o: any) => o.name,
  fetchUrl,
  delay = 2000 }: Props) => {

  const { authAxios } = useContext(AxiosContext);

  const lastFetch = useRef(Date.now());
  const [ focused, setFocused ] = useState(-1); // Current focused option

  const [blurred, setBlurred] = useState(false);

  const [ inputValue, setInputValue ] = useState(value);

  const [allSuggestions, setAllSuggestions] = useState<Suggestion[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const [lastSelected, setLastSelected] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: any) => {
    const inputVal = e.target.value;
    setInputValue(inputVal);
    onChange(e);
  };

  const fetchSuggestions = useCallback((url: string, filter: any) => {
    console.log('fetching axios', filter);
    authAxios.get(url, {params: filter}).then((r: any) => {
      console.log('fetched sug:', r.data.data);
      setAllSuggestions(r.data.data);
    }).catch((e: any) => {
      console.error(e);
    });
  }, [authAxios]);

  useEffect(() => {
    const empty = inputValue.length <= 0 || inputValue === lastSelected;
    const getFilteringFn = (v: string) => (o: any) => o.name.toLowerCase().includes(v);
    // const filtered = inputValue.length > 0 ? allSuggestions.filter(getFilteringFn(inputValue.toLowerCase())) : [];
    const filtered = empty ? [] : allSuggestions.filter(getFilteringFn(inputValue.toLowerCase()));
    setSuggestions(filtered);
  }, [inputValue, allSuggestions, lastSelected]);

  useEffect(() => {
    console.log('effect', inputValue, lastSelected);
    if (inputValue.length <= 0) return;
    if (inputValue === lastSelected) return;
    const handler = setTimeout(() => {
      console.log('fetching after delay');
      // fetch all suggestions
      fetchSuggestions(fetchUrl, {filters: { "name": {"$regex": inputValue, "$options": 'i'}}});
      lastFetch.current = Date.now();
    }, delay - (Date.now() - lastFetch.current));
    return () => { clearTimeout(handler)};
  }, [inputValue, delay, fetchUrl, fetchSuggestions, lastSelected]);

  const blur = () => {
    // debounce blurring?
    // setTimeout(() => setSuggestions([]), 300);
    setSuggestions([]);
    setBlurred(true);
  };

  const select = (value: any) => {
    if (inputRef.current) {
      inputRef.current.value = suggestionFn(value);
    }
    setInputValue(suggestionFn(value));
    setLastSelected(suggestionFn(value));
    // setAllSuggestions([]);
    onSelect(value);
  };

  const handleClick = (value: Suggestion) => {
    console.log(value);
    // setInputValue
    select(value);
  }

  const handleKey = (e: any) => {
    const key = e.keyCode;
    if (key === 40) {
      // arrow down: move to the sug list
      e.preventDefault();
      if (focused + 1 >= suggestions.length) {
        setFocused(-1);
      } else {
        setFocused(focused + 1);
      }
    }
    if (key === 38) {
      e.preventDefault();
      // arrow up
      if (focused >= 0) {
        setFocused(focused - 1);
      }
    }
    if (key === 13) {
      // Enter, prevent default, close suggestion move to next tab
      e.preventDefault();
      if(focused >= 0 && focused < suggestions.length) {
        // select
        select(suggestions[focused]);
      } else {
        // move on
        select(undefined);
      }
      setSuggestions([]);
    }
  }

  return (<div className="autocomplete-container">
    <input
      onFocus={() => setBlurred(false)}
      disabled={disabled}
      className={inputValue ?  '' : 'empty'}
      id={id}
      value={inputValue}
      onChange={handleChange}
      onBlur={blur}
      ref={inputRef}
      autoComplete="off"
      onKeyDown={handleKey}
      placeholder="Development"
    />
    {!blurred && suggestions.length > 0 && (
      <div className="autocomplete-suggestion-list">
        {suggestions.map((suggestion, index) => (
          <div
            className={index === focused ? 'active' : ''}
            key={index}
            // onClick={() => handleClick(suggestion)}
            onMouseDown={() => handleClick(suggestion)}
          >{suggestionFn(suggestion)}</div>
        ))}
      </div>
    )}
  </div>);
};