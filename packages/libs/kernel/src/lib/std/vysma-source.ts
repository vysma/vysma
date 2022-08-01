import {
  EventRegistry,
  SourceArgs,
  SourceConfig,
  SourceEventArgs,
  SourceMutationArgs,
  SourceSetupArgs,
} from '@vysma/interfaces';
import { camelCase, capitalCase, capitalCaseTransform } from 'change-case';

import { makeEventRegistry } from './vysma-event';
import makeSubject from 'callbag-subject';

const formatEventName = (eventName: string) =>
  camelCase(`when${capitalCase(eventName)}`);

const makeSourceSetup = <TConfig, TEvents, TRef>(
  setupCallback: SourceSetupArgs<TConfig, TEvents, TRef>
) => {
  const subject = makeSubject();
  return (config: TConfig) => {};
};

export const createSource = <
  TEvents extends SourceEventArgs<any, any>,
  TMutations extends SourceMutationArgs<any>,
  T extends SourceArgs<TEvents, TMutations>,
  TSetup extends SourceSetupArgs<any, any, any>
>(
  params: T,
  setupCallback: TSetup extends SourceSetupArgs<infer TConfig, any, infer TRef>
    ? SourceSetupArgs<TConfig, T['events'], TRef>
    : any
): SourceConfig<T['events'], TSetup, T['mutations']> => {
  const eventRegistries: Record<string, EventRegistry<any, any>> = {};
  if (params.events) {
    for (const eventName in params.events) {
      eventRegistries[formatEventName(eventName)] = makeEventRegistry(
        eventName,
        params.events[eventName]
      );
    }
  }

  const register = makeSourceSetup(setupCallback);

  return { events: eventRegistries as any, mutations: {} as any, register };
};
