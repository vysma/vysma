import {
  sourceConfig,
  whenTiktok,
} from '../testhelpers/preset-source-interval';

describe('vysma-event', () => {
  it('should create new source type', () => {
    expect(sourceConfig).toHaveProperty('register');
    expect(sourceConfig).toHaveProperty('events');
    // expect(sendCleanup).toEqual({});
  });
});
