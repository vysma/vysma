import { createSource } from './vysma-source';

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
    const sourceConfig = createSource({
      setup: (config: number) => {
        console.log(`All set: ${config}`);
      },
      events: {
        even: (value: number) => value % 2 === 0,
        odd: (value: string) => value === 'hello',
      },
    });
    const {
      events: { whenEven, whenOdd },
      setup,
    } = sourceConfig;
    expect(sourceConfig).toHaveProperty('setup');
    expect(sourceConfig).toHaveProperty('events');
  });
});
