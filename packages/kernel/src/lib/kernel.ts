import { UnwrapSink, UnwrapSource } from './tallbag';

import pipe from 'callbag-pipe';
import share from 'tallbag-share';
import subscribe from 'callbag-subscribe';

export interface KernelConfiguration {
  sources: UnwrapSource<any>[];
  triggers: UnwrapSink<any>[];
}

export function kernel(config: KernelConfiguration): Kernel {
  const app = Kernel.create(config);
  app.bootstrap();
  return app;
}

export class Kernel {
  public initialized = false;
  private _sources: UnwrapSource<any>[] = [];
  private _streams: any[];

  constructor(public config: KernelConfiguration) {
    this.bootstrap();
  }

  bootstrap() {
    const sources = this.config.sources;
    this._sources = sources.map((src) => share(src as any));
    this._streams = this._sources.map((src) =>
      pipe(
        src as any,
        subscribe((args) => console.log(args))
      )
    );
    // Register source of events
    this.initialized = true;
  }

  public static create(config: KernelConfiguration): Kernel {
    return new Kernel(config);
  }
}
