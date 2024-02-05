import { defaultToWhenEmpty, getOnPath, setOnPath } from './transform-fns';
import React, { ChangeEvent, ReactNode } from 'react';
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
  const path = name.split(`.`);
  const value = getOnPath({ obj: state, path });
  const newValue =
    target instanceof HTMLSelectElement && target.multiple
      ? defaultToWhenEmpty({
          defaultValue: value as string[],
          arr: getOptions(target.selectedOptions),
        })
      : target.value;

  return setOnPath({ obj: state, path, value: newValue }) as State;
};

export const replaceWithNode = ({
  fullText,
  partToReplaceWithNode,
  node,
}: {
  fullText: string;
  partToReplaceWithNode: string;
  node: ReactNode;
}) =>
  fullText.split(partToReplaceWithNode).reduce(
    (acc, item, i) =>
      i === 0 ? (
        <>{item}</>
      ) : (
        <>
          {acc}
          {node}
          {item}
        </>
      ),
    <></>,
  );
