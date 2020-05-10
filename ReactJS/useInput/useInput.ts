import { useState } from 'react';


interface UseInputProps {
  initialValue: string;
  required?: boolean;
  regExp?: RegExp;
  errorMessages?: {
    required?: string;
    regExp?: string;
    customValidation?: string;
  };
  customValidation?: (value: string) => boolean;
}

export default function useInputValue({
  initialValue,
  required = false,
  regExp = /.*/,
  errorMessages = {},
  customValidation = () => true,
}: UseInputProps) {
  const [ value, setValue ] = useState<String>(initialValue);
  const [ wasActivated, setWasActivated ] = useState<Boolean>(false);
  const [ error, setError ] = useState<String | null>(null);


  function validate(value: string) {
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

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = e.target.value;
    const error = validate(value);

    setValue(value);
    setError(error);
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
