import {
  Callbag,
  EventNamedMapping,
  EventRegistry,
  EventRegistryOptions,
  EventSetupEval,
  VysmaContext,
} from '@vysma/interfaces';

export const makeEventEmitter =
  <T, M extends EventNamedMapping<any>, E extends EventSetupEval<T, M>>(
    eventRegister: E,
    subject: Callbag<T, any>
  ) =>
  (payload: T, context: VysmaContext) =>
    subject(1, eventRegister(payload, context));

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
  eventConfigSetup: TSetup,
  source: Callbag<any, any>
): EventRegistry<T, M> => {
  const eventRegistry = (options: EventRegistryOptions<M> | undefined) => {
    return {
      source,
      kind: eventName,
      register: (payload: T, context: VysmaContext) =>
        eventConfigSetup(payload, context),
      filter: options?.where,
    };
  };
  return eventRegistry;
};
