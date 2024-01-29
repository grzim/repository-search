import { defaultToWhenEmpty, getOnPath, updateInPath } from './transform-fns';
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
  const path = name.split('.');
  const value = getOnPath({ obj: state, path });
  const newValue =
    target instanceof HTMLSelectElement && target.multiple
      ? defaultToWhenEmpty({
          defaultValue: value as string[],
          arr: getOptions(target.selectedOptions),
        })
      : target.value;

  return updateInPath({ obj: state, path, value: newValue }) as State;
};
