import { EventRegistry, ExtractEventType } from './event';
import { ExtractMutationType, MutationRegistry } from './mutation';

import { IContext } from './context';

export type SetupFilter<TConfig, TEvents extends SourceEventArgs<any>> = (
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
  [k: string]: (value: T, context: IContext) => void;
}
export interface SourceEventArgs<T> {
  [k: string]: (value: T, context: IContext) => boolean;
}

export type SourceSetupContext<TEvents> = {
  emit: {
    [Prop in keyof TEvents as `emit${Capitalize<string & Prop>}`]: (
      value: ExtractEventType<TEvents[Prop]>
    ) => void;
  };
};

export type SourceSetupArgs<TConfig, TEvents, TRef> = (
  config: TConfig,
  context: SourceSetupContext<TEvents>
) => TRef | void;

export interface SourceArgs<
  TEvents extends SourceEventArgs<any>,
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
      ExtractEventType<Events[Prop]>
    >;
  };
  setup: (config: ExtractSetupType<TSetup>) => void;
};
