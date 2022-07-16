import {
  createEvent,
  createSource,
  createTrigger,
  kernel,
} from '@vysma/kernel';

interface ClockEvenEvent {
  evenData: number;
}

interface ClockOddEvent {
  oddData: number;
}

const whenEven = createEvent<ClockEvenEvent>('even');
const whenOdd = createEvent<ClockOddEvent>('odd');

const TikTokSource = createSource<number, NodeJS.Timer>({
  name: 'TikTok',
  id: 'com.vysma.tiktok',
  events: [whenEven, whenOdd],
  init: (duration, [onEven, onOdd]) => {
    let counter = 0;
    const current = setInterval(() => {
      counter = counter + 1;
      console.log('counter:', counter);
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
  event: whenEven,
  action: (x) => console.log(`LogWhenEven: ${JSON.stringify(x)}`),
});

const LogWhenOdd = createTrigger({
  event: whenOdd,
  action: (x) => console.log(`LogWhenOdd: ${JSON.stringify(x)}`),
});

kernel({
  sources: [TikTokSource(1000)],
  triggers: [LogWhenEven, LogWhenOdd],
}).run();
