import {
  EventNamedMapping,
  EventPayload,
  EventRegistered,
  EventRegistry,
  EventRegistryOptions,
  EventSetupEval,
  VysmaContext,
} from '@vysma/interfaces';

import { Callbag } from '../callbag';

export const makeEventEmitter =
  <T, M extends EventNamedMapping<any>, ER extends EventRegistered<T, M>>(
    eventRegistry: ER,
    subject: Callbag<any, any>
  ) =>
  (payload: T, context: VysmaContext) =>
    subject(1, eventRegistry.register(payload, context));

/**
 *
 * @param eventName Eventname for mapping & diagramming
 * @param eventConfig Configuration defined by the Source creator
 * @returns
 */
export const makeEventRegistry = <
  T,
  M extends EventNamedMapping<any>,
  TSetup extends EventSetupEval<T, M>
>(
  eventName: string,
  eventConfigSetup: TSetup
): EventRegistry<T, M> => {
  const eventRegistry = (options: EventRegistryOptions<M> | undefined) => {
    return {
      kind: eventName,
      register: (payload: T, context: VysmaContext) =>
        eventConfigSetup(payload, context),
      filter: options?.where,
    };
  };
  return eventRegistry;
};
