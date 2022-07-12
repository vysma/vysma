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
  current: T;
}

export interface VysmaSourceInput<C, R, E extends UnwrapEventReference<any>[]> {
  name?: string;
  id: string;
  events: VysmaEventConfig<any>[];
  init: Initializer<C, R, VysmaEventCallback<any>[]>;
}

export interface VysmaTrigger {
  event?: any;
  condition?: any;
  action: any;
}
