import { EventRegistry, ExtractEventRegistryType } from '@vysma/interfaces';
export interface TriggerArgs<TEvent extends EventRegistry<any, any>> {
  event: TEvent;
  condition?: (payload: ExtractEventRegistryType<TEvent>) => boolean;
  action: (payload: ExtractEventRegistryType<TEvent>) => void | any;
}

export type TriggerConfig<TEvent extends EventRegistry<any, any>> = {
  event: ExtractEventRegistryType<TEvent>;
};

export const createTrigger = <TEvent extends EventRegistry<any, any>>(
  args: TriggerArgs<TEvent>
): TriggerConfig<TEvent> => {
  return { event: 0 };
};
