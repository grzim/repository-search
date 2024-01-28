import {
  CamelToSnakeCase,
  ConvertFieldsToSnakeCase,
  ConvertNumberFieldsToObj,
  GitHubResponseWrapper,
  NumberToObject,
} from '../types';
import { assertType } from '../../../test-utils/type-testing';

assertType<CamelToSnakeCase<'testStringHere'>>('test_string_here');
assertType<NumberToObject<5>>({ totalCount: 5 });
assertType<ConvertNumberFieldsToObj<{ testField: number }>>({
  testField: { totalCount: 1 },
});
assertType<
  ConvertNumberFieldsToObj<{ testField: number; anotherField: string }>
>({
  testField: { totalCount: 1 },
  anotherField: 'value',
});
assertType<ConvertFieldsToSnakeCase<{ testField: number }>>({ test_field: 1 });

type SimpleNestedObject = {
  primaryField: number;
  nestedObject: {
    nestedField: string;
    anotherNestedField: boolean;
  };
};

assertType<ConvertFieldsToSnakeCase<SimpleNestedObject>>({
  primary_field: 1,
  nested_object: {
    nested_field: 'value',
    another_nested_field: true,
  },
});

type SimpleRepoData = { starCount: number; forkCount: number };
assertType<GitHubResponseWrapper<SimpleRepoData>>({
  node: {
    star_count: { totalCount: 100 },
    fork_count: { totalCount: 50 },
  },
});

type ComplexRepoData = {
  starCount: number;
  forkCount: number;
  owner: {
    name: string;
    followerCount: number;
  };
};

// Expected to handle nested objects and apply conversions recursively.
assertType<GitHubResponseWrapper<ComplexRepoData>>({
  node: {
    star_count: { totalCount: 100 },
    fork_count: { totalCount: 50 },
    owner: {
      name: 'NAME',
      follower_count: { totalCount: 1000 },
    },
  },
});
