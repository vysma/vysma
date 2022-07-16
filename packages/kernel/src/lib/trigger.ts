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
        // Check for appropriate event by filtering the `eventName` and the trigger condition
        filter((eventPayload: VysmaEvent<any>) => {
          const { eventName, payload } = config.event(eventPayload);
          return eventName === eventPayload.eventName && config.condition
            ? config.condition(payload)
            : true;
        })
      )
    );
    return subscription;
  };

  return { makeTrigger };
}

export type VysmaTriggerConfig = ReturnType<typeof createTrigger>;
