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
          tiktok: ({ value, timestamp }: ClockEvent) => ({
            count: value,
            time: timestamp,
            evaluatedField: value > 10 ? true : false,
          }),
        },
        mutations: {
          cleanup: (val: { force: boolean }) => {
            console.log(`Cleaned up!`);
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
          // emit.emitEven(i);
          // emit.emitOdd(i);
          // emit.emitTimeElapsed(new Date());
          // emit(i++);
          console.log();
        }, duration);
      }
    );
    const {
      events: { whenTiktok },
      mutations: { sendCleanup },
      setup,
    } = sourceConfig;
    expect(sourceConfig).toHaveProperty('setup');
    expect(sourceConfig).toHaveProperty('events');
    expect(whenTiktok).toEqual({});
    expect(sendCleanup).toEqual({});
  });
});
