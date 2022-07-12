import { Callbag } from './callbag';

export interface VysmaEvent<T> {
  eventName: string;
  payload: T;
}

export interface VysmaEventReference {
  sourceId: string;
  eventName: string;
}

export type VysmaEventConfig<T> = (payload: T) => VysmaEvent<T>;

export type UnwrapEventReference<T> = T extends VysmaEventConfig<infer R>
  ? VysmaEventCallback<R>
  : never;

/**
 * Create a event symbol that could be referenced for Source and Trigger
 * @param eventName Name of the event should be emitted by a source
 * @returns VysmaEventCallback
 */
export function createEvent<T>(eventName: string): VysmaEventConfig<T> {
  return (payload: T) => ({
    eventName,
    payload,
  });
}

export const makeEvent =
  <T>(eventEmitter: VysmaEventConfig<T>, subject: Callbag<any, any>) =>
  (runtimePayload: T) => {
    subject(1, eventEmitter(runtimePayload));
  };

export type VysmaEventCallback<T> = ReturnType<typeof makeEvent<T>>;
