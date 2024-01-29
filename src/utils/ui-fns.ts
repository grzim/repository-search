import { defaultToWhenEmpty, getOnPath, updateInPath } from './transform-fns';
import { ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material';

export const getOptions = (
  options: HTMLCollectionOf<HTMLOptionElement>,
): string[] => Array.from(options).map((option) => option.value);

export const handleChange = <State extends Record<string, unknown>>(
  event:
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | SelectChangeEvent<unknown>,
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
