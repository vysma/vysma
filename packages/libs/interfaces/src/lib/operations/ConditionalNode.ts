import { EventPayload } from '../event';

export type Pred<T extends any[] = any[]> = (...a: T) => boolean;

export type ConditionalNode<T> = (payload: EventPayload<T>) => boolean;

type GetExpressionValue<T extends EventPayload<any>, R> = (
  payload: T
) => (...args: any[]) => R;

type BooleanExpression<
  T extends EventPayload<any>,
  G extends GetExpressionValue<T, any>,
  K
> = (getter: G) => (args: Pred<T>) => (value: K) => boolean;

// type ConditionalExpression<
//   V,
//   EV,
//   T extends EventPayload<any>,
//   G extends (payload: T) => V,
//   E extends (value: V) => EV
// > = (
//   getter: G,
//   expression: E
// ) => (inputValue: V, expressionValue: EV) => boolean;

export const either = <T extends EventPayload<any>>(
  firstExpression: BooleanExpression<T>,
  secondExpression: BooleanExpression<T>
): ConditionalExpression<T> => {
  const evaluate = (getter: any, expression: any) => (inputValue: any) => {};
};

export type ConditionalWithProps<
  T extends EventPayload<any>,
  K extends keyof T['named'],
  ARGS extends any[]
> = (prop: K, ...args: ARGS) => ConditionalNode<T>;

export const greaterThan = (a: number) => (val: number) => val > a;
export const greaterThanEqual = (a: number) => (val: number) => val >= a;
export const lessThan = (a: number) => (val: number) => val < a;
export const lessThanEqual = (a: number) => (val: number) => val <= a;
export const equal = (a: number) => (val: number) => val === a;

/**
 * Check whether a `key` of mapping input is equal to a specific value
 *
 */
export const check =
  <T extends EventPayload<any>, K extends keyof T['named']>(
    key: K,
    expression: (val: T['named'][K]) => boolean
  ): ConditionalNode<T> =>
  (payload) =>
    expression((payload.named as any)[key]);

export const both =
  <T>(
    first: ConditionalNode<any>,
    second: ConditionalNode<any>
  ): ConditionalNode<T> =>
  (payload: any) =>
    first(payload) && second(payload);
