import {
  TIKTOK_EVENT,
  sourceConfig,
} from '../testhelpers/preset-source-interval';

import { formatEventName } from './vysma-source';

describe('vysma-source', () => {
  it('should create event register', () => {
    expect(sourceConfig).toHaveProperty('events');
    expect(sourceConfig.events).toHaveProperty(formatEventName(TIKTOK_EVENT));
  });
});
