import { useState, useCallback } from "react";


type ControllableStateProps<T> = {
  value?: T;
  onChange?: (value: T) => void;
  defaultValue?: T;
};

export function useControllableState<T>(props: ControllableStateProps<T>): [T | undefined, (newValue: T) => void] {
  const { value, onChange, defaultValue } = props;

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const controlled = value !== undefined;
  const currentValue = controlled ? value : uncontrolledValue;

  const setValue = useCallback((newValue: T) => {
    if (controlled) {
      return onChange?.(newValue);
    }

    setUncontrolledValue(newValue);

    return onChange?.(newValue);
  }, [controlled, onChange]);

  return [currentValue, setValue];
}
