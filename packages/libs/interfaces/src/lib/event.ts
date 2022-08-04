import { Callbag } from './callbag';
import { VysmaContext } from './context';

export type EventRegistryWhereOptions<T extends EventNamedMapping<any>> = {
  [Prop in keyof T]: (value: T[Prop]) => boolean;
};

export interface EventRegistryOptions<T extends EventNamedMapping<any>> {
  /**
   * Conditional filter an appropriate event payload
   */
  where?: Partial<EventRegistryWhereOptions<T>>;
}

export type EventNamedMapping<K extends Record<string, any>> = {
  [Prop in keyof K]: K[Prop];
};

/**
 * Developer when implement new event will need to inherit this signature in their events's source
 */
export type EventSetupEval<T, K extends EventNamedMapping<any>> = (
  payload: T,
  context?: VysmaContext
) => K;

type NullFunc = () => null;
export type EventEmitter<T> = T extends NullFunc
  ? () => void
  : T extends EventSetupEval<infer TPayload, any>
  ? (payload: TPayload) => void
  : never;

export type EventSetupPayload<T, TMapping> = (
  payload: T,
  context: VysmaContext
) => {
  rawData: T;
  computedMap: TMapping;
};

export type EventFilter<T> = (value: T, context: VysmaContext) => boolean;

export type EventPackedType<T, M> = {
  type: T;
  mapping: M;
};

export type ExtractEventType<T> = T extends EventSetupEval<infer TPayload, any>
  ? TPayload
  : never;

export type ExtractEventMappingType<T> = T extends EventSetupEval<any, infer R>
  ? R
  : never;

export type ExtractEventRegistryType<T> = T extends EventRegistry<
  infer Type,
  infer Mapping
>
  ? EventPackedType<Type, Mapping>
  : never;

export type EventRegistered<T, M> = {
  source: Callbag<any, any>;
  kind: string;
  // When kernel map with a source, it will pipe the condition to filter specific events
  register: (payload: T, context: VysmaContext) => M;
  filter?: Partial<EventRegistryWhereOptions<M>>;
};

export type EventPayload<T> = T extends EventRegistered<
  infer Type,
  infer Mapping
>
  ? {
      raw: Type;
      named: Mapping;
    }
  : never;

export type EventRegistry<T, M extends EventNamedMapping<any>> = (
  options?: EventRegistryOptions<M>
) => EventRegistered<T, M>;
