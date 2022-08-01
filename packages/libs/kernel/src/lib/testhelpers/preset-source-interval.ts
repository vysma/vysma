import { VysmaContext } from '@vysma/interfaces';
import { createSource } from '../std/vysma-source';
import { createTrigger } from '../std/vysma-trigger';
import { gt } from 'ramda';

export const sampleContext: VysmaContext = {
  state: {},
  ref: {},
};
export interface ClockEventPayload {
  value: number;
  timestamp: Date;
}

export interface ClockEventNames {
  /** Counting value */
  counter: number;
  time: Date;
  evaluatedField: boolean;
}

export interface CleanupProps {
  force: boolean;
}

export const TIKTOK_EVENT = 'tiktok';

export const sourceConfig = createSource(
  {
    // Predefine list of emitable events
    events: {
      [TIKTOK_EVENT]: ({
        value,
        timestamp,
      }: ClockEventPayload): ClockEventNames => ({
        counter: value,
        time: timestamp,
        evaluatedField: value > 10 ? true : false,
      }),
    },
    // Predefine list of mutable function
    mutations: {
      cleanup: (props: CleanupProps) => {
        console.log(`Cleaned up: `, props.force);
      },
    },
  },
  (duration: number, { emit: { emitTiktok } }) => {
    console.log(`Init interval: ${duration}`);
    let i = 0;

    return setInterval(() => {
      i++;
      emitTiktok({
        value: i,
        timestamp: new Date(),
      });
      console.log();
    }, duration);
  }
);

export const { whenTiktok } = sourceConfig.events;
export const { sendCleanup } = sourceConfig.mutations;

export const sampleTrigger = createTrigger({
  event: whenTiktok({
    where: { counter: gt(10) },
  }),
  condition: ({ named: { counter: count } }) => count > 10,
  action: (data) => console.log(`Hello World: ${data}`),
});
