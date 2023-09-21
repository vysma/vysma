import {
  EventRegistry,
  ExtractSetupType,
  SourceArgs,
  SourceConfig,
  SourceEventArgs,
  SourceMutationArgs,
  SourceSetupArgs,
  SourceSetupContext,
} from '@vysma/interfaces';
import { camelCase, capitalCase } from 'change-case';
import { makeEventEmitter, makeEventRegistry } from './vysma-event';

import makeSubject from 'callbag-subject';

export const formatEventName = (eventName: string, prefix = 'when') =>
  camelCase(`${prefix}${capitalCase(eventName)}`);

export const createSource = <
  TEvents extends SourceEventArgs<any, any>,
  TMutations extends SourceMutationArgs<any>,
  T extends SourceArgs<TEvents, TMutations>,
  TSetup extends SourceSetupArgs<any, any, any>
>(
  params: T,
  setupCallback: TSetup extends SourceSetupArgs<infer TConfig, any, infer TRef>
    ? SourceSetupArgs<TConfig, Required<T['events']>, TRef>
    : any
): SourceConfig<T['events'], TSetup, T['mutations']> => {
  // Singleton instance of subject that would allow appropriate EventRegistry to listen on
  const source = makeSubject();

  const eventRegistries: Record<string, EventRegistry<any, any>> = {};
  if (params.events) {
    for (const eventName in params.events) {
      eventRegistries[formatEventName(eventName)] = makeEventRegistry(
        eventName,
        params.events[eventName],
        source
      );
    }
  }

  /**
   * A register function for a source to be bootstraped by Vysma application
   * @param config Source configuration when registering with kernel
   */
  const register = (config: ExtractSetupType<TSetup>) => {
    const eventEmitters: SourceSetupContext<TEvents>['emit'] = {} as any;
    for (const eventName in params.events) {
      (eventEmitters as any)[eventName] = makeEventEmitter(
        params.events![eventName],
        source
      );
    }

    return setupCallback(config, { emit: eventEmitters as any });
  };

  return {
    source,
    register,
    events: eventRegistries as any,
    mutations: {} as any,
  };
};
