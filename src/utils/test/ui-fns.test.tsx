import { getOptions, handleChange, replaceWithNode } from '../ui-fns';
import React from 'react';
import { render } from '@testing-library/react';

describe(`${getOptions.name}`, () => {
  it(`extracts values from HTMLOptionElements`, () => {
    const options = {
      0: { value: `option1` },
      1: { value: `option2` },
      length: 2,
    };

    const result = getOptions(
      options as unknown as HTMLCollectionOf<HTMLOptionElement>,
    );
    expect(result).toEqual([`option1`, `option2`]);
  });
});

describe(`${handleChange.name}`, () => {
  it(`updates state based on input value`, () => {
    const initialState = { field: `` };
    const mockEvent = {
      target: {
        name: `field`,
        value: `newValue`,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    const expectedState = { field: mockEvent.target.value };

    const actualState = handleChange(mockEvent, initialState);
    expect(actualState).toEqual(expectedState);
  });

  it(`updates state based on selected options for multiple select`, () => {
    const initialState = { field: [`option1`] };
    const target = {
      name: `field`,
      multiple: true,
      selectedOptions: [
        { value: `option2` } as HTMLOptionElement,
        { value: `option3` } as HTMLOptionElement,
      ],
    };
    Object.setPrototypeOf(target, HTMLSelectElement.prototype);
    const mockEvent = {
      target,
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    const expectedState = { field: [`option2`, `option3`] };

    const actualState = handleChange(mockEvent, initialState);
    expect(actualState).toEqual(expectedState);
  });

  it(`retains initial value if multiple select becomes empty`, () => {
    const initialState = { field: [`option1`] };
    const target = {
      name: `field`,
      multiple: true,
      selectedOptions: [],
    };
    const mockEvent = {
      target,
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    Object.setPrototypeOf(target, HTMLSelectElement.prototype);

    const expectedState = { field: [`option1`] };

    const actualState = handleChange(mockEvent, initialState);
    expect(actualState).toEqual(expectedState);
  });
});

describe(replaceWithNode.name, () => {
  it(`handles multiple occurrences of the part`, () => {
    const fullText = `Hello, world! Hello, world!`;
    const partToReplaceWithNode = `world`;
    const node = <em>ReactNode</em>;
    const { getAllByText } = render(
      replaceWithNode({ fullText, partToReplaceWithNode, node }),
    );

    expect(getAllByText(`ReactNode`)).toHaveLength(2);
  });

  it(`returns original text if part to replace is not found`, () => {
    const fullText = `Hello, world!`;
    const partToReplaceWithNode = `universe`;
    const node = <span>ReactNode</span>;
    const { getByText } = render(
      replaceWithNode({ fullText, partToReplaceWithNode, node }),
    );

    expect(getByText(`Hello, world!`)).toBeInTheDocument();
  });

  it(`works with empty strings for part to replace`, () => {
    const fullText = `Hello, world!`;
    const partToReplaceWithNode = ``;
    const node = <div>ReactNode</div>;
    const { getByText } = render(
      replaceWithNode({ fullText, partToReplaceWithNode, node }),
    );

    expect(getByText(`Hello, world!`)).toBeInTheDocument();
  });
});
