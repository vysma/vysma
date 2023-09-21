import {
  ConditionalNode,
  EventPayload,
  EventRegistered,
  EventRegistry,
  ExtractEventRegistryType,
} from '@vysma/interfaces';
export interface TriggerArgs<TEvent extends EventRegistered<any, any>> {
  event: TEvent;
  // condition?: (payload: EventPayload<TEvent>) => boolean;
  condition?: ConditionalNode<EventPayload<TEvent>>;
  action: (payload: EventPayload<TEvent>) => void | any;
}

export type TriggerConfig<TEvent extends EventRegistry<any, any>> = {
  event: ExtractEventRegistryType<TEvent>;
};

export const createTrigger = <TEvent extends EventRegistered<any, any>>(
  args: TriggerArgs<TEvent>
) => {
  return { event: 0 };
};
