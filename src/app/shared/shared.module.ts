import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { environment } from "@environment";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production })
  ],
  exports: [CommonModule, ReactiveFormsModule]
})
export class SharedModule {}
