import {
  UnwrapEventReference,
  createEvent,
  createSource,
  createTrigger,
  kernel,
} from '@vysma/kernel';

import take from 'tallbag-take';

interface ClockEvenEvent {
  evenData: number;
}

interface ClockOddEvent {
  oddData: number;
}

const wenEven = createEvent<ClockEvenEvent>('even');
const wenOdd = createEvent<ClockOddEvent>('odd');

type TikTokEventTypes = [
  UnwrapEventReference<typeof wenEven>,
  UnwrapEventReference<typeof wenOdd>
];

const TikTokSource = createSource<number, NodeJS.Timer, TikTokEventTypes>({
  name: 'TikTok',
  id: 'com.vysma.tiktok',
  events: [wenEven, wenOdd],
  init: (duration: number, [onEven, onOdd]) => {
    let counter = 0;
    const current = setInterval(() => {
      counter = counter + 1;
      if (counter % 2 === 0) {
        onEven({ evenData: counter });
      } else {
        onOdd({ oddData: counter });
      }
    }, duration);
    return { current };
  },
});

const LogWhenEven = createTrigger({
  event: wenEven,
  action: take(1),
});

const LogWhenOdd = createTrigger({
  event: wenOdd,
  action: take(2),
});

kernel({
  sources: [TikTokSource],
  triggers: [LogWhenEven, LogWhenOdd],
});
