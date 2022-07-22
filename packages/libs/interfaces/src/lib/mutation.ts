export type MutationFilter<T> = (value: T) => void;

export interface MutationRegistry<T> {
  name: string;
  setup: (payload: T) => T;
}

export type ExtractMutationType<T> = T extends MutationFilter<infer M>
  ? M
  : never;
