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
        counter: value,
        time: timestamp,
        evaluatedField: value > 10 ? true : false,
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
    where: { counter: gt(10) },
  }),
  condition: ({ named: { counter: count } }) => count > 10,
  action: (data) => console.log(`Hello World: ${data}`),
});
