export interface IVysmaAppState {
  [k: string]: any;
}

export interface IVysmaAppRef {
  [k: string]: any;
}

export interface VysmaContext {
  state: IVysmaAppState;
  ref: IVysmaAppRef;
}
