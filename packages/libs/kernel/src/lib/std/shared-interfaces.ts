export interface ISourceOutput<T> {
  sourceId: string;
  payload: T;
}

export interface IContext {
  app: any;
}
