import { VysmaContext, check, greaterThan, lessThan } from '@vysma/interfaces';

import { createSource } from '../std/vysma-source';
import { createTrigger } from '../std/vysma-trigger';

export const sampleContext: VysmaContext = {
  state: {},
  ref: {},
};
export interface ClockEventPayload {
  value: number;
  timestamp: Date;
}

export enum TRIGGERING_EVENT {
  /**
   * The counter
   */
  COUNTER,
  /**
   * The timestamp when the event was triggered
   */
  TIME,
}

export interface ClockEventNames {
  /** Counting value */
  [TRIGGERING_EVENT.COUNTER]: number;
  [TRIGGERING_EVENT.TIME]: Date;
}

export interface CleanupProps {
  force: boolean;
}

export interface SourceProps {
  duration: number;
}

export const TIKTOK_EVENT = 'tiktok';
export const OTHER_EVENT = 'other';

export const sourceConfig = createSource(
  {
    // Predefine list of emitable events
    events: {
      /**
       * Emit new tiktok event
       */
      [TIKTOK_EVENT]: ({
        value,
        timestamp,
      }: ClockEventPayload): ClockEventNames => ({
        [TRIGGERING_EVENT.COUNTER]: value,
        [TRIGGERING_EVENT.TIME]: timestamp,
      }),
      [OTHER_EVENT]: () => null,
    },
    // Predefine list of mutable function
    mutations: {
      cleanup: (props: CleanupProps) => {
        console.log(`Cleaned up: `, props.force);
      },
    },
  },
  (props: SourceProps, { emit }) => {
    console.log(`Init interval: ${props.duration}`);
    let i = 0;
    const { tiktok } = emit;

    emit.other();
    return setInterval(() => {
      i++;
      tiktok({
        value: i,
        timestamp: new Date(),
      });
    }, props.duration);
  }
);

export const { whenTiktok, whenOther } = sourceConfig.events;
export const { sendCleanup } = sourceConfig.mutations;

export const sampleTrigger = createTrigger({
  event: whenTiktok({
    where: { [TRIGGERING_EVENT.COUNTER]: greaterThan(10) },
  }),
  condition: check(TRIGGERING_EVENT.COUNTER, lessThan(100)),
  action: (data) => console.log(`Hello World: ${data}`),
});
