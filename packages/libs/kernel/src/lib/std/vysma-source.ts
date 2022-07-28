import {
  EventRegistry,
  EventRegistryOptions,
  EventSetupEval,
  EventSetupPayload,
  ExtractEventRegistryType,
  SourceArgs,
  SourceConfig,
  SourceEventArgs,
  SourceMutationArgs,
  SourceSetupArgs,
  VysmaContext,
} from '@vysma/interfaces';

/**
 *
 * @param eventName Eventname for mapping & diagramming
 * @param eventConfig Configuration defined by the Source creator
 * @returns
 */
const makeEventRegistry = <
  TSetup extends EventSetupEval<any, any>,
  E extends ExtractEventRegistryType<TSetup>,
  R extends EventRegistry<E['type'], E['mapping']>
>(
  eventName: string,
  eventConfigSetup: TSetup
): R => {
  return (() => ({})) as any;
  // const setupPayload =
  //   (compute: boolean) =>
  //   (payload: T, context: VysmaContext): EventSetupPayload<T, TE> => ({
  //     rawData: payload,
  //     computedMap: compute ? eventConfig(payload, context) : null,
  //   });
  // return (options?: EventRegistryOptions) => {
  //   const { compute = false } = options!;
  //   return {
  //     kind: eventName,
  //     register: setupPayload(compute),
  //   };
  // };
};

export const createSource = <
  TEvents extends SourceEventArgs<any, any>,
  TMutations extends SourceMutationArgs<any>,
  T extends SourceArgs<TEvents, TMutations>,
  TSetup extends SourceSetupArgs<any, any, any>
>(
  params: T,
  setup: TSetup extends SourceSetupArgs<infer TConfig, any, infer TRef>
    ? SourceSetupArgs<TConfig, T['events'], TRef>
    : any
): SourceConfig<T['events'], TSetup, T['mutations']> => {
  const eventRegistries: Record<string, EventRegistry<any, any>> = {};
  if (params.events) {
    for (const eventName in params.events) {
      eventRegistries[eventName] = makeEventRegistry(
        eventName,
        params.events[eventName]
      );
    }
  }

  return { events: eventRegistries as any, mutations: {} as any };
};
