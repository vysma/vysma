import { EventRegistry, ExtractEventRegistryType } from './vysma-source';
export interface TriggerArgs<TEvent extends EventRegistry<any>> {
  event: TEvent;
  condition?: (payload: ExtractEventRegistryType<TEvent>) => boolean;
  action: (payload: ExtractEventRegistryType<TEvent>) => void | any;
}

export type TriggerConfig<TEvent extends EventRegistry<any>> = {
  event: ExtractEventRegistryType<TEvent>
};

export const createTrigger = <TEvent extends EventRegistry<any>>(args: TriggerArgs<TEvent>): TriggerConfig<TEvent> {
  return {event: 0}
}
