import {
  ExtractEventType,
  SourceArgs,
  SourceConfig,
  SourceEventArgs,
  SourceMutationArgs,
  SourceSetupArgs,
} from '@vysma/interfaces';

import { IContext } from './shared-interfaces';

export const createSource = <
  TEvents extends SourceEventArgs<any, any>,
  TMutations extends SourceMutationArgs<any>,
  T extends SourceArgs<TEvents, TMutations>,
  TSetup extends SourceSetupArgs<any, any, any>
>(
  params: T,
  setup: TSetup extends SourceSetupArgs<infer TConfig, any, infer TRef>
    ? SourceSetupArgs<TConfig, T['events'], TRef>
    : any
): SourceConfig<T['events'], TSetup, T['mutations']> => {
  // make EventSignal
  console.log(params, setup);
  return {};
};
