import { Kernel, KernelConfiguration, kernel } from './kernel';
import { createEvent, createTrigger } from './trigger';

import interval from 'tallbag-interval';
import take from 'tallbag-take';

const TikTokEvent = createEvent('tiktok', interval(1000));

const TimerTrigger = createTrigger({
  event: [TikTokEvent],
  condition: (x: number) => x % 2 === 0,
  action: take(1),
});

describe('kernel', () => {
  let app: Kernel;
  const config: KernelConfiguration = {
    sources: [interval(1000)],
    triggers: [TimerTrigger],
  };

  beforeEach(() => {
    app = kernel(config);
  });

  it('should initialize the kernel', () => {
    expect(app.initialized).toEqual(true);
  });

  it('should able to register sources', () => {
    expect(app.config?.sources).toEqual(config.sources);
  });
});
