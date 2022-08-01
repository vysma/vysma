import { SourceConfig } from './source';

export interface VysmaModuleArgs {
  sources: Array<SourceConfig<any, any, any>>;
}

export interface VysmaModuleRegistry {}
