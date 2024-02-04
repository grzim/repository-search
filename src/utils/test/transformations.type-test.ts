import {
  CamelToSnakeCase,
  ConvertFieldsToSnakeCase,
  ConvertNumberFieldsToObj,
  NumberToObject,
} from '@utils/type-transformations';
import { assertType } from '@test/index';

assertType<CamelToSnakeCase<`testStringHere`>>(`test_string_here`);
assertType<NumberToObject<5>>({ totalCount: 5 });
assertType<ConvertNumberFieldsToObj<{ testField: number }>>({
  testField: { totalCount: 1 },
});
assertType<
  ConvertNumberFieldsToObj<{ testField: number; anotherField: string }>
>({
  testField: { totalCount: 1 },
  anotherField: `value`,
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
    nested_field: `value`,
    another_nested_field: true,
  },
});
