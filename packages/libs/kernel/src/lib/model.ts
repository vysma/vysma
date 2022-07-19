import {
  UnwrapEventReference,
  VysmaEventCallback,
  VysmaEventConfig,
} from './event';

export type Initializer<C, R, E extends UnwrapEventReference<any>[]> = (
  config: C,
  eventEmitters: E
) => VysmaSourceRef<R>;

export interface VysmaSourceRef<T> {
  current: T | undefined | null;
}

export interface VysmaSourceInput<C, R> {
  name?: string;
  id: string;
  events: VysmaEventConfig<any>[];
  init?: Initializer<C, R, VysmaEventCallback<any>[]>;
}
