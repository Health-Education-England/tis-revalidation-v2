import { NgModule, InjectionToken, Inject, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { InjectScript } from '../utilities.functions';
import { DOCUMENT } from '@angular/common';

export interface HotjarConfig {
  hotjarid: number;
  hotjarsv: number;
  enabled: boolean;
}

const HotjarConfigValue = new InjectionToken<HotjarConfig>('HotjarConfig');

@NgModule({
  declarations: []
})
export class HotjarModule {
  private hotjarscript: HTMLScriptElement;

  constructor(
    @Optional() @SkipSelf() parentModule?: HotjarModule,
    @Inject(HotjarConfigValue) private hotjarConfig?: HotjarConfig,
    @Inject(DOCUMENT) private document?: Document
  ) {
    if (parentModule) {
      throw new Error(`HotjarModule is already loaded. Import it in the AppModule only`);
    }

    if (!hotjarConfig) {
      throw new Error(`HotjarModule requires forRoot({ hotjarid: 'hotjar client id', hotjarsv: 'version number of hotjars js to use' })`);
    }

    this.InitialiseHotjar();
  }

  private InitialiseHotjar(): void {
    if (!this.hotjarscript && this.hotjarConfig.enabled) {
      const win = (window as any);
      win.hj=win.hj||function(){(win.hj.q=win.hj.q||[]).push(arguments)};
      const hotjarsrc = `https://static.hotjar.com/c/hotjar-${this.hotjarConfig.hotjarid}.js?sv=${this.hotjarConfig.hotjarsv}`;
      this.hotjarscript = InjectScript(hotjarsrc, true, this.document);
    }
  }

  static forRoot(config: HotjarConfig): ModuleWithProviders {
    return {
      ngModule: HotjarModule,
      providers: [
        { provide: HotjarConfigValue, useValue: config }
      ]
    };
  }
}
