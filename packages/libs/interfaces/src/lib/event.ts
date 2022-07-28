import { VysmaContext } from './context';

export interface EventRegistryOptions {
  /**
   * Should the Event resolver compute the mapping or not
   * Setting this option will allow the VysmaTrigger access computed fields in the following context
   * @default false
   */
  compute?: boolean;
}

export type EventNamedMapping<K extends Record<string, any>> = {
  [Prop in keyof K]: K[Prop];
};

/**
 * Developer when implement new event will need to inherit this signature in their events's source
 */
export type EventSetupEval<T, K extends EventNamedMapping<any>> = (
  payload: T,
  context: VysmaContext
) => K;

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
  kind: string;
  // When kernel map with a source, it will pipe the condition to filter specific events
  register: (payload: T, context: VysmaContext) => M;
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
  options?: EventRegistryOptions
) => EventRegistered<T, M>;
