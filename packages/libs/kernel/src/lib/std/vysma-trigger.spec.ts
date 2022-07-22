import { EventRegistry, createSource } from './vysma-source';

import { createTrigger } from './vysma-trigger';

describe('vysma-trigger', () => {
  const sourceConfig = createSource(
    {
      events: {
        even: (value: number) => value % 2 === 0,
        odd: (value: number) => value % 2 !== 0,
        timeElapsed: (value: Date) => true,
      },
      mutations: {
        cleanup: (val: { force: boolean }, context) => {
          console.log(`Cleaned up!`);
        },
      },
    },
    (duration: number, { emit }) => {
      console.log(`Init interval: ${duration}`);
      let i = 0;

      return setInterval(() => {
        i++;
        emit.emitEven(i);
        emit.emitOdd(i);
        emit.emitTimeElapsed(new Date());
        // emit(i++);
        console.log();
      }, duration);
    }
  );
  const { whenEven } = sourceConfig.events;
  it('should create new source type', () => {
    const trigger = createTrigger({
      event: whenEven,
      condition: (value) => value > 10,
      action: (value) => console.log(value, typeof value),
    });
  });
});
