import { useState, useCallback } from "react";


export function useControllableState(props) {
  const { value, onChange, defaultValue } = props;

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const controlled = value !== undefined;
  const currentValue = controlled ? value : uncontrolledValue;

  const setValue = useCallback((newValue) => {
    if (controlled) {
      return onChange?.(newValue);
    }

    setUncontrolledValue(newValue);

    return onChange?.(newValue);
  }, [controlled, onChange]);

  return [currentValue, setValue];
}
