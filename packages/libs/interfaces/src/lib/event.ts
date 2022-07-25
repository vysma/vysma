import { IContext } from './context';

export interface EventPayload<TEvent, TContext> {
  sourceId: string;
  payload: TEvent;
  context: TContext;
}

export type EventMapping<T, K> = (
  payload: T,
  context: IContext
) => {
  [Prop in keyof K]: K[Prop];
};

export type EventFilter<T> = (value: T, context: IContext) => boolean;

export interface EventRegistry<T> {
  kind: string;
  // When kernel map with a source, it will pipe the condition to filter specific events
  setup: (payload: T) => boolean;
}

export type ExtractEventType<T> = T extends EventMapping<infer TPayload, any>
  ? TPayload
  : never;
export type ExtractEventRegistryType<T> = T extends EventRegistry<infer R>
  ? R
  : never;
