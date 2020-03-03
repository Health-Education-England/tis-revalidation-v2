import {
  NgModule,
  InjectionToken,
  Inject,
  Optional,
  SkipSelf,
  ModuleWithProviders
} from "@angular/core";
import { InjectScript } from "../utilities.functions";
import { DOCUMENT } from "@angular/common";

export interface HotJarConfig {
  hotJarId: number;
  hotJarSv: number;
  enabled: boolean;
}

const HotJarConfigValue = new InjectionToken<HotJarConfig>("HotJarConfig");

@NgModule({
  declarations: []
})
export class HotJarModule {
  private hotJarScript: HTMLScriptElement;

  static forRoot(config: HotJarConfig): ModuleWithProviders {
    return {
      ngModule: HotJarModule,
      providers: [{ provide: HotJarConfigValue, useValue: config }]
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule?: HotJarModule,
    @Inject(HotJarConfigValue) private hotJarConfig?: HotJarConfig,
    @Inject(DOCUMENT) private document?: Document
  ) {
    if (parentModule) {
      throw new Error(
        `HotJarModule is already loaded. Import it in the AppModule only`
      );
    }

    if (!hotJarConfig) {
      throw new Error(
        `HotJarModule requires forRoot({ hotJarId: 'hotJar client id', hotJarSv: 'version number of hotJar js to use' })`
      );
    }

    this.InitializeHotJar();
  }

  private InitializeHotJar(): void {
    if (!this.hotJarScript && this.hotJarConfig.enabled) {
      const win = window as any;
      if (win.hj) {
        win.hj = win.hj;
      } else {
        win.hj = (...args: any) => {
          ((window as any).hj.q = (window as any).hj.q || []).push(args);
        }; // FIX: The 'arguments' object cannot be referenced in an arrow function in ES3 and ES5. Consider using a standard function expression.
      }
      const hotJarSrc = `https://static.hotjar.com/c/hotjar-${this.hotJarConfig.hotJarId}.js?sv=${this.hotJarConfig.hotJarSv}`;
      this.hotJarScript = InjectScript(hotJarSrc, true, this.document);
    }
  }
}
