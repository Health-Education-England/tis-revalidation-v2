import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { StripHtmlPipe } from "./strip-html.pipe";
import { FileBytesPipe } from "./file-bytes.pipe";

const modulePipes = [StripHtmlPipe, FileBytesPipe];
@NgModule({
  declarations: [PageNotFoundComponent, ...modulePipes],
  imports: [RouterModule],
  exports: [...modulePipes]
})
export class SharedModule {}
