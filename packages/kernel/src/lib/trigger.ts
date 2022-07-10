import { Sink, Source, Tallbag, UnwrapSink, UnwrapSource } from './tallbag';

import { Callbag } from './callbag';
import combine from 'tallbag-combine';
import filter from 'tallbag-filter';
import pipe from 'callbag-pipe';

export interface TriggerConfiguration<
  E extends Source<any, any>,
  A extends Sink<any, any>
> {
  event: UnwrapSource<E>;
  condition?: (d: any) => boolean;
  action: UnwrapSink<A>;
}

export interface VysmaEvent<T extends Source<any, any>> {
  sourceId: string;
  sourceRef: UnwrapSource<T>;
}

export function createEvent<T extends Source<any, any>>(
  name: string,
  sourceRef: UnwrapSource<T>
): VysmaEvent<T> {
  return { sourceId: name, sourceRef };
}

export function createTrigger<
  E extends Source<any, any>,
  A extends Sink<any, any>
>(config: TriggerConfiguration<E, A>): any {
  // return pipe(combine(config.event), filter(config.condition!), config.action);
  return config.action;
}
