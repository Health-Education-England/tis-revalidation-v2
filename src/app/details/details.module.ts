import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../shared/material/material.module";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { DetailsSideNavComponent } from "./details-side-nav/details-side-nav.component";
import { DetailsSideNavService } from "./details-side-nav/service/details-side-nav.service";
import { NgxsModule } from "@ngxs/store";
import { DetailsSideNavState } from "./details-side-nav/state/details-side-nav.state";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "src/app/core/auth/auth.interceptor";
import { RecordDetailsComponent } from "./record-details/record-details.component";
import {
  CommentsToolBarComponent,
  DeleteCommentDialogueComponent
} from "./comments-tool-bar/comments-tool-bar.component";
import { NotesToolBarComponent } from "./notes-tool-bar/notes-tool-bar.component";
import { CommentsService } from "./comments-tool-bar/comments.service";

@NgModule({
  // TODO double check if NavBarComponent, DetailsSideNavComponent
  // are needed to be imported and/or exported as the RecordDetailsComponent
  // already encapsulate both of them
  declarations: [
    NavBarComponent,
    DetailsSideNavComponent,
    RecordDetailsComponent,
    CommentsToolBarComponent,
    NotesToolBarComponent,
    DeleteCommentDialogueComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    NgxsModule.forFeature([DetailsSideNavState])
  ],
  providers: [
    DetailsSideNavService,
    CommentsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [
    NavBarComponent,
    DetailsSideNavComponent,
    RecordDetailsComponent,
    CommentsToolBarComponent
  ],
  entryComponents: [DeleteCommentDialogueComponent]
})
export class DetailsModule {}
