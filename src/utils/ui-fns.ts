import { defaultToWhenEmpty } from './transform-fns';
import React from 'react';

export const getOptions = (
  options: HTMLCollectionOf<HTMLOptionElement>,
): string[] => Array.from(options).map((option) => option.value);

export type HandleChange = <State extends Record<string, unknown>>(
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  state: State,
) => State;

export const handleChange: HandleChange = <
  State extends Record<string, unknown>,
>(
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  state: State,
) => {
  const target = event.target;
  const name = target.name;
  const newValue =
    target instanceof HTMLSelectElement && target.multiple
      ? defaultToWhenEmpty({
          defaultValue: state[name] as string[],
          arr: getOptions(target.selectedOptions),
        })
      : target.value;

  // The assertion to 'State' ensures the returned object matches the state shape
  return { ...state, [name]: newValue } as State;
};
