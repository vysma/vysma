import { IContext } from './context';

export interface EventPayload<TEvent, TContext> {
  sourceId: string;
  payload: TEvent;
  context: TContext;
}

export type EventFilter<T> = (value: T, context: IContext) => boolean;

export interface EventRegistry<T> {
  kind: string;
  // When kernel map with a source, it will pipe the condition to filter specific events
  setup: (payload: T) => boolean;
}

export type ExtractEventType<T> = T extends EventFilter<infer R> ? R : never;
export type ExtractEventRegistryType<T> = T extends EventRegistry<infer R>
  ? R
  : never;
