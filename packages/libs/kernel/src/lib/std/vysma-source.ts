import { IContext } from './shared-interfaces';

export interface EventPayload<TEvent, TContext> {
  sourceId: string;
  payload: TEvent;
  context: TContext;
}

export type EventFilter<T> = (value: T, context: IContext) => boolean;
export type SetupFilter<C> = (config: C) => void;

type ExtractEventType<T> = T extends EventFilter<infer R> ? R : never;
type ExtractSetupType<T> = T extends SetupFilter<infer C> ? C : never;

export interface EventRegistry<T> {
  kind: string;
  // When kernel map with a source, it will pipe the condition to filter specific events
  setup: (payload: T) => boolean;
}

export interface SourceEventArgs<T> {
  [k: string]: (value: T, context: IContext) => boolean;
}

export type SourceSetupArgs<T> = (config: T) => void;

export interface SourceArgs<
  TSetup extends SourceSetupArgs<any>,
  TEvent extends SourceEventArgs<any>
> {
  setup: TSetup;
  events: TEvent;
}

type SourceConfig<Events, TSetup> = {
  events: {
    [Prop in keyof Events as `when${Capitalize<string & Prop>}`]: EventRegistry<
      ExtractEventType<Events[Prop]>
    >;
  };
  setup: ExtractSetupType<TSetup>;
};

export const createSource = <T extends SourceArgs<any, any>>(
  params: T
): SourceConfig<T['events'], T['setup']> => {
  // make EventSignal
  return {};
};
