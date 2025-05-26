/**
 * @file src/hooks/useToggle.ts
 * @description A React hook for managing a boolean state and providing a function to toggle it.
 */
import { useState, useCallback } from 'react';

/**
 * @typedef ToggleState
 * @description Represents the boolean state managed by the useToggle hook.
 */
type ToggleState = boolean;

/**
 * @typedef ToggleHandler
 * @description Represents the function used to toggle the boolean state.
 */
type ToggleHandler = () => void;

/**
 * @function useToggle
 * @description A React hook that manages a boolean state and provides a function to toggle it.
 * @param {ToggleState} [initialValue=false] - The initial value of the boolean state. Defaults to `false`.
 * @returns {[ToggleState, ToggleHandler]} An array containing the current state and a function to toggle it.
 *
 * @example
 * ```typescript
 * const [isOn, toggleIsOn] = useToggle(true);
 *
 * // To toggle the state:
 * toggleIsOn();
 * ```
 */
const useToggle = (initialValue: ToggleState = false): [ToggleState, ToggleHandler] => {
  const [value, setValue] = useState<ToggleState>(initialValue);

  const toggle = useCallback<ToggleHandler>(() => {
    setValue((prevValue: ToggleState) => !prevValue);
  }, []);

  return [value, toggle];
};

export default useToggle;