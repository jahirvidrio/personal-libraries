import { useState, useEffect } from 'react';


export default function useInputValue({
  initialValue,
  required = false,
  regExp = /.*/,
  minLength,
  maxLength,
  errorMessages = {},
  customValidation = () => true,
}) {
  const [ value, setValue ] = useState(initialValue);
  const [ wasActivated, setWasActivated ] = useState(false);
  const [ error, setError ] = useState(null);


  function validate() {
    if (required && value.length === 0) {
      return setError(errorMessages.required || 'This value must be provide');
    }

    if (minLength && value.length < minLength) {
      return setError(errorMessages.minLength || `This value must have a minimum length of ${minLength}`);
    }

    if (maxLength && value.length > maxLength) {
      return setError(errorMessages.maxLength || `This value must have a maximum length of ${maxLength}`);
    }

    if (!regExp.test(value)) {
      return setError(errorMessages.regExp || 'This value doesn\'t match the requested format.');
    }

    if (!customValidation(value)) {
      return setError(errorMessages.customValidation || 'This value doesn\'t match the requested format.');
    }

    return setError(null);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(e.target.value);
  }

  function onBlur() {
    setWasActivated(true);
  }

  useEffect(() => {
    validate();
  }, [ value, wasActivated ]);


  return {
    onChange,
    onBlur,
    validate,
    value,
    error,
    wasActivated,
  };
}
