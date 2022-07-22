import { IContext } from './shared-interfaces';

export interface EventPayload<TEvent, TContext> {
  sourceId: string;
  payload: TEvent;
  context: TContext;
}

export type EventFilter<T> = (value: T, context: IContext) => boolean;
export type SetupFilter<TConfig, TEvents extends SourceEventArgs<any>> = (
  config: TConfig,
  callback: SourceSetupCallback<TEvents>
) => void;
export type MutationFilter<T> = (value: T) => void;

type ExtractEventType<T> = T extends EventFilter<infer R> ? R : never;
type ExtractSetupType<T> = T extends SetupFilter<infer TConfig, infer TCallback>
  ? TConfig
  : never;
type ExtractMutationType<T> = T extends MutationFilter<infer M> ? M : never;

export interface EventRegistry<T> {
  kind: string;
  // When kernel map with a source, it will pipe the condition to filter specific events
  setup: (payload: T) => boolean;
}

export interface MutationRegistry<T> {
  name: string;
  setup: (payload: T) => T;
}

export interface SourceEventArgs<T> {
  [k: string]: (value: T, context: IContext) => boolean;
}

export interface SourceMutationArgs<T> {
  [k: string]: (value: T, context: IContext) => void;
}

// export type SourceSetupCallback<TEvents extends SourceEventArgs<any>> = {
export type SourceSetupCallback<TEvents> = {
  emit: {
    [Prop in keyof TEvents as `emit${Capitalize<string & Prop>}`]: (
      value: ExtractEventType<TEvents[Prop]>
    ) => void;
  };
};

export type SourceSetupArgs<
  TConfig,
  TEvents, // extends SourceEventArgs<any>,
  TRef
> = (config: TConfig, callback: SourceSetupCallback<TEvents>) => TRef | void;

export interface SourceArgs<
  TEvents extends SourceEventArgs<any>,
  TMutations extends SourceMutationArgs<any>
  // TSetup extends SourceSetupArgs<any, TEvents, any>
> {
  events?: TEvents;
  mutations?: TMutations;
  // setup: TSetup;
}

type SourceConfig<Events, TSetup, TMutations> = {
  // Dispatch || emitting functions
  mutations: {
    [Prop in keyof TMutations as `send${Capitalize<
      string & Prop
    >}`]: MutationRegistry<ExtractMutationType<TMutations[Prop]>>;
  };
  events: {
    [Prop in keyof Events as `when${Capitalize<string & Prop>}`]: EventRegistry<
      ExtractEventType<Events[Prop]>
    >;
  };
  setup: (config: ExtractSetupType<TSetup>) => void;
};

export const createSource = <
  TEvents extends SourceEventArgs<any>,
  TMutations extends SourceMutationArgs<any>,
  T extends SourceArgs<TEvents, TMutations>,
  TSetup extends SourceSetupArgs<any, any, any>
>(
  params: T,
  setup: TSetup extends SourceSetupArgs<infer TConfig, any, infer TRef>
    ? SourceSetupArgs<TConfig, T['events'], TRef>
    : any
): SourceConfig<T['events'], TSetup, T['mutations']> => {
  // make EventSignal
  console.log(params, setup);
  return {};
};
