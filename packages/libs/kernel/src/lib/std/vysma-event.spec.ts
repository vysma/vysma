import {
  ClockEventNames,
  ClockEventPayload,
  TIKTOK_EVENT,
  sampleContext,
  whenTiktok,
} from '../testhelpers/preset-source-interval';

describe('vysma-event', () => {
  it('should check event kind', () => {
    expect(whenTiktok().kind).toEqual(TIKTOK_EVENT);
  });

  it('should check register mapping function', () => {
    const samplePayload: ClockEventPayload = {
      value: 20,
      timestamp: new Date(),
    };
    const mappingPayload: ClockEventNames = {
      counter: samplePayload.value,
      time: samplePayload.timestamp,
      evaluatedField: true,
    };
    const eventRegistry = whenTiktok();
    const register = eventRegistry.register(samplePayload, sampleContext);
    expect(register).toEqual(mappingPayload);
  });

  it('should check register filter function', () => {
    const eventRegistry = whenTiktok({ where: { counter: (v) => v > 10 } });
    expect(eventRegistry).toHaveProperty('filter');
    if (eventRegistry.filter) {
      expect(eventRegistry.filter.counter!(11)).toEqual(true);
    }
  });
});
