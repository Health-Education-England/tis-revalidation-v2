import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { environment } from "@environment";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { MaterialModule } from "./material/material.module";
import { AllocateAdminAutocompleteComponent } from "./admins/allocate-admin-autocomplete/allocate-admin-autocomplete.component";
import { RecordsService } from "../records/services/records.service";
import { StripHtmlPipe } from "./strip-html.pipe";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    AllocateAdminAutocompleteComponent,
    StripHtmlPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production })
  ],
  providers: [RecordsService],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    StripHtmlPipe,
    AllocateAdminAutocompleteComponent
  ]
})
export class SharedModule {}
