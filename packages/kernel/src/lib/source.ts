import { UnwrapEventReference, VysmaEventCallback, makeEvent } from './event';

import { VysmaSourceInput } from './model';
import makeSubject from 'callbag-subject';

export interface VysmaSourceConfig {
  source: any;
  // events: EventReference[];
}

export function createSource<C, R, E extends UnwrapEventReference<any>[]>(
  sourceConfig: VysmaSourceInput<C, R, E>
): VysmaSourceConfig {
  const subject = makeSubject();
  const eventEmitters: VysmaEventCallback<any>[] = sourceConfig.events.map(
    (eventEmitter) => makeEvent(eventEmitter, subject)
  );
  // const eventReferences = sourceConfig.events.map((eventEmitter) => ({
  //   sourceId: sourceConfig.id,
  //   eventName: eventEmitter({}).eventName, // Simulate call to get the `eventName`
  // }));
  const makeSource = (config: C) => {
    const { current } = sourceConfig.init(config, eventEmitters);
    return current;
  };
  return {
    source: { id: sourceConfig.id, subject, makeSource },
    // events: eventReferences,
  };
}
