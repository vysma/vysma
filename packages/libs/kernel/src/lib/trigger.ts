import { VysmaEvent, VysmaEventConfig } from './event';

import { UnwrapSource } from './tallbag';
import filter from 'tallbag-filter';
import forEach from 'tallbag-for-each';
import pipe from 'callbag-pipe';

// import combine from 'tallbag-combine';
// import filter from 'tallbag-filter';
// import pipe from 'callbag-pipe';

export interface TriggerConfiguration {
  event: VysmaEventConfig<any>;
  condition?: (payload: any) => boolean;
  action: (payload: any) => void;
}

export function createTrigger(config: TriggerConfiguration) {
  const makeTrigger = (source: UnwrapSource<any>) => {
    const subscription = forEach(config.action)(
      pipe(
        source as any,
        // Check for appropriate event by filtering the `eventName`
        filter((eventPayload: VysmaEvent<any>) => {
          const { eventName } = config.event(eventPayload);
          return eventName === eventPayload.eventName;
        }),
        // Check for trigger condition
        filter((eventPayload: VysmaEvent<any>) => {
          if (config.condition) {
            return config.condition(eventPayload.payload);
          }
          return true;
        })
      )
    );
    return subscription;
  };

  return { makeTrigger };
}

export type VysmaTriggerConfig = ReturnType<typeof createTrigger>;
