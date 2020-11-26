import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "./material/material.module";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ApiService } from "./services/api/api.service";
import { StripHtmlPipe } from "./strip-html.pipe";
import { FileBytesPipe } from "./file-bytes.pipe";

const modulePipes = [StripHtmlPipe, FileBytesPipe];
@NgModule({
  declarations: [PageNotFoundComponent, ConfirmDialogComponent, ...modulePipes],
  imports: [RouterModule, MaterialModule],
  exports: [...modulePipes],
  providers: [ApiService]
})
export class SharedModule {}
