import { EventPayload } from '../event';

export type ConditionalNode<T> = (payload: EventPayload<T>) => boolean;

/**
 * Check whether a key is equal to a value
 *
 */
export const is =
  <T extends EventPayload<any>, K extends keyof T['named']>(
    key: K,
    value: T['named'][K]
  ): ConditionalNode<T> =>
  (payload) =>
    (payload.named as any)[key] === value;

export type both<T> = (payload: EventPayload<T>) => boolean;
