import { VysmaEventCallback, makeEvent } from './event';

import { VysmaSourceInput, VysmaSourceRef } from './model';
import makeSubject from 'callbag-subject';

export function createSource<C, R>(sourceConfig: VysmaSourceInput<C, R>) {
  const subject = makeSubject();
  const eventEmitters: VysmaEventCallback<any>[] = sourceConfig.events.map(
    (eventEmitter) => makeEvent(eventEmitter, subject)
  );
  const makeSource = (config: C): VysmaSourceRef<R> => {
    const { current } = sourceConfig.init(config, eventEmitters);
    return { current };
  };
  return (config: C) => ({
    id: sourceConfig.id,
    ref: { subject: subject as any },
    makeSource,
    config,
  });
}

export type VysmaSource<C, R> = ReturnType<typeof createSource<C, R>>;

export type VysmaSourceConfig<C, R> = ReturnType<VysmaSource<C, R>>;
