import { Sink, Source, UnwrapSink, UnwrapSource } from './tallbag';

import { VysmaTrigger } from './model';

// import combine from 'tallbag-combine';
// import filter from 'tallbag-filter';
// import pipe from 'callbag-pipe';

export interface TriggerConfiguration<
  E extends Source<any, any>,
  A extends Sink<any, any>
> {
  event?: UnwrapSource<E>;
  condition?: (d: any) => boolean;
  action: UnwrapSink<A>;
}

// export function createEvent<T extends Source<any, any>>(
//   name: string,
//   sourceRef: UnwrapSource<T>
// ): VysmaEvent<T> {
//   return { sourceId: name, sourceRef };
// }

export function createTrigger<
  E extends Source<any, any>,
  A extends Sink<any, any>
>(config: TriggerConfiguration<E, A>): VysmaTrigger {
  // return pipe(combine(config.event), filter(config.condition!), config.action);
  return { action: config.action };
}
