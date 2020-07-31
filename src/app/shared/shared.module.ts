import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { StripHtmlPipe } from "./strip-html.pipe";

@NgModule({
  declarations: [PageNotFoundComponent, StripHtmlPipe],
  imports: [RouterModule],
  exports: [StripHtmlPipe]
})
export class SharedModule {}
