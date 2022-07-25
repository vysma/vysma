import { createSource } from './vysma-source';
import { emitKeypressEvents } from 'readline';

interface ClockEvent {
  value: number;
  timestamp: Date;
}

describe('vysma-event', () => {
  it('should create new source type', () => {
    const sourceConfig = createSource(
      {
        events: {
          tiktok: (payload: ClockEvent) => ({
            count: payload.value,
            time: payload.timestamp,
          }),
        },
        mutations: {
          cleanup: (val: { force: boolean }) => {
            console.log(`Cleaned up!`);
          },
        },
      },
      (duration: number, { emit }) => {
        console.log(`Init interval: ${duration}`);
        let i = 0;

        return setInterval(() => {
          i++;
          emit.emitTiktok({
            value: i,
            timestamp: new Date(),
          });
          // emit.emitEven(i);
          // emit.emitOdd(i);
          // emit.emitTimeElapsed(new Date());
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
