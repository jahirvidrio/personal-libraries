import { useState } from 'react';


export default function useInputValue({
  initialValue,
  required = false,
  regExp = /.*/,
  errorMessages = {},
  customValidation = () => true,
}) {
  const [ value, setValue ] = useState(initialValue);
  const [ wasActivated, setWasActivated ] = useState(false);
  const [ error, setError ] = useState(null);


  function validate(value) {
    if (required && (value.length === 0)) {
      return errorMessages.required || 'This value must be provide';
    }

    if (!regExp.test(value)) {
      return errorMessages.regExp || 'This value doesn\'t match the requested format.';
    }

    if (!customValidation(value)) {
      return errorMessages.customValidation || 'This value doesn\'t match the requested format.';
    }

    return null;
  }

  function onChange(e) {
    const value = e.target.value;
    const error = validate(value);

    setValue(value);
    setError(error);
  }

  function onBlur(e) {
    onChange(e);
    setWasActivated(true);
  }

  return {
    onChange,
    onBlur,
    value,
    error,
    wasActivated,
  };
}
