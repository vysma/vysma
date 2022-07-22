import { createSource } from './vysma-source';
import { emitKeypressEvents } from 'readline';

interface ClockEvenEvent {
  kind: 'even';
  evenData: number;
}

interface ClockOddEvent {
  kind: 'odd';
  oddData: number;
}

describe('vysma-event', () => {
  it('should create new source type', () => {
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
          // cleanup: (payload: any, ref: any, state: any) => {
          //   clearInterval(ref);
          // },
          // resume: () => {
          //   console.log(`Interval resumed!`);
          // },
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
    const {
      events: { whenEven, whenOdd, whenTimeElapsed },
      mutations: { sendCleanup },
      setup,
    } = sourceConfig;
    expect(sourceConfig).toHaveProperty('setup');
    expect(sourceConfig).toHaveProperty('events');
    expect(whenEven).toEqual({});
    expect(sendCleanup).toEqual({});
  });
});
