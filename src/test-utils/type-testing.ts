/**
 * Asserts that a given value `value` is of type `T`.
 * This function leverages TypeScript's static type checking to enforce that the passed `value`
 * conforms to the type `T`. If `value` does not match the type `T`, TypeScript will raise a
 * compile-time error, indicating a type mismatch.
 *
 * Note: This function does not perform any runtime type checking and does not have any impact
 * on the runtime behavior of the code. Its sole purpose is to utilize TypeScript's type system
 * for development-time type assertions.
 *
 * @param value - The value to be type-checked against type `T`.
 * @returns The same `value`, assuming it conforms to type `T`. If not, a compile-time error is raised.
 */
export function assertType<T>(value: T): T {
  return value;
}
