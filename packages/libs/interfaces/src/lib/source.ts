import {
  EventRegistry,
  EventSetupEval,
  ExtractEventMappingType,
  ExtractEventType,
} from './event';
import { ExtractMutationType, MutationRegistry } from './mutation';

import { VysmaContext } from './context';

export type SetupFilter<TConfig, TEvents extends SourceEventArgs<any, any>> = (
  config: TConfig,
  callback: SourceSetupContext<TEvents>
) => void;

export type ExtractSetupType<T> = T extends SetupFilter<
  infer TConfig,
  infer TCallback
>
  ? TConfig
  : never;

export interface SourceMutationArgs<T> {
  [k: string]: (value: T, context: VysmaContext) => void;
}

// export interface SourceEventArgs<T, TMapping extends EventMapping<T, any>>
//   extends Record<string, EventMapping<T, TMapping>> {
//   // [k: string]: EventMapping<T, TMapping>;
// }

export type SourceEventArgs<
  T,
  TEventSetupEval extends EventSetupEval<T, any>
> = Record<string, TEventSetupEval>;

export type SourceSetupContext<TEvents> = {
  emit: {
    [Prop in keyof TEvents as `emit${Capitalize<string & Prop>}`]: (
      value: ExtractEventType<TEvents[Prop]>
    ) => void;
  };
};

export type EventReturnType<
  T,
  TMapping extends (payload: T) => TMapping
> = ReturnType<TMapping>;

export type SourceSetupArgs<TConfig, TEvents, TRef> = (
  config: TConfig,
  context: SourceSetupContext<TEvents>
) => TRef | void;

export interface SourceArgs<
  TEvents extends SourceEventArgs<any, any>,
  TMutations extends SourceMutationArgs<any>
> {
  events?: TEvents;
  mutations?: TMutations;
}

export type SourceConfig<Events, TSetup, TMutations> = {
  mutations: {
    [Prop in keyof TMutations as `send${Capitalize<
      string & Prop
    >}`]: MutationRegistry<ExtractMutationType<TMutations[Prop]>>;
  };
  events: {
    [Prop in keyof Events as `when${Capitalize<string & Prop>}`]: EventRegistry<
      ExtractEventType<Events[Prop]>,
      ExtractEventMappingType<Events[Prop]>
    >;
  };
  setup?: (config: ExtractSetupType<TSetup>) => void;
};
