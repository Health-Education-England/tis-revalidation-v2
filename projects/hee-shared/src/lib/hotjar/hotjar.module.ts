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

const HotJarURI = `https://static.hotjar.com`;

@NgModule({
  declarations: []
})
export class HotJarModule {
  public get hotJarScript(): HTMLScriptElement {
    return this.document.head.querySelector(`script[src^="${HotJarURI}"]`);
  }

  static forRoot(config: HotJarConfig): ModuleWithProviders<HotJarModule> {
    return {
      ngModule: HotJarModule,
      providers: [{ provide: HotJarConfigValue, useValue: config }]
    };
  }

  constructor(
    @Optional() @SkipSelf() private parentModule?: HotJarModule,
    @Inject(HotJarConfigValue) private hotJarConfig?: HotJarConfig,
    @Inject(DOCUMENT) private document?: Document
  ) {
    this.InitializeHotJar();
  }

  public InitializeHotJar(): void {
    if (this.hotJarScript) {
      this.hotJarScript.remove();
    }

    if (this.parentModule) {
      throw new Error(
        `HotJarModule is already loaded. Import it in the AppModule only`
      );
    }

    if (!this.hotJarConfig) {
      throw new Error(
        `HotJarModule requires forRoot({ hotJarId: 'hotJar client id', hotJarSv: 'version number of hotJar js to use' })`
      );
    }

    if (this.hotJarScript == null && this.hotJarConfig.enabled === true) {
      const win = window as any;
      if (!win.hj) {
        win._hjSettings = {
          hjid: this.hotJarConfig.hotJarId,
          hjsv: this.hotJarConfig.hotJarSv
        };
        win.hj = (...args: any) => {
          ((window as any).hj.q = (window as any).hj.q || []).push(args);
        }; // FIX: The 'arguments' object cannot be referenced in an arrow function in ES3 and ES5. Consider using a standard function expression.
      }
      const hotJarSrc = `${HotJarURI}/c/hotjar-${this.hotJarConfig.hotJarId}.js?sv=${this.hotJarConfig.hotJarSv}`;
      InjectScript(hotJarSrc, true, this.document);
    }
  }
}
