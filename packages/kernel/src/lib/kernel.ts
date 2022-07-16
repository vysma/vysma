import { UnwrapSource } from './tallbag';
import { VysmaSourceConfig } from './source';
import { VysmaTriggerConfig } from './trigger';
import pipe from 'callbag-pipe';
import share from 'tallbag-share';

export interface KernelConfiguration {
  sources: VysmaSourceConfig<any, any>[];
  triggers: VysmaTriggerConfig[];
}

export function kernel(config: KernelConfiguration): Kernel {
  const app = Kernel.create(config);
  app.bootstrap();
  return app;
}

export class Kernel {
  public initialized = false;
  private _sourceConfigs: UnwrapSource<any>[] = [];
  private _triggers: any[] = [];
  private _contexts: { [k: string]: any } = {};

  constructor(public kernalConfig: KernelConfiguration) {}

  /**
   * Register all sources and store the references into memory,
   * then connect every triggers with each source, mapping dependencies.
   *
   * In the next release, will use this method to bootstrap more contexts like pushable source, pullable source, state management
   */
  bootstrap() {
    const sources = this.kernalConfig.sources;
    const triggers = this.kernalConfig.triggers;

    // Store shared singleton source ref
    this._sourceConfigs = sources.map(
      (srcConfig): (() => UnwrapSource<any>) => {
        return share(srcConfig.ref.subject);
      }
    );

    // Map every trigger with each shared source
    this._triggers = triggers.map((trigger) =>
      this._sourceConfigs.map((source) => trigger.makeTrigger(source))
    );

    // Store references context by source id

    this.initialized = true;
  }

  /**
   * Invoke the `init` function on each source
   */
  run() {
    // Initialize every source and store the references as context
    this.kernalConfig.sources.forEach(({ id, makeSource, config }) => {
      this._contexts[id] = makeSource(config);
    });
    console.log(`Kernel initialized!`);
  }

  public static create(config: KernelConfiguration): Kernel {
    return new Kernel(config);
  }
}
