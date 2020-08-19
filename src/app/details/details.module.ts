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
import { NotesToolBarComponent } from "./notes-tool-bar/notes-tool-bar.component";
import { CommentsService } from "./comments/comments.service";
import { NotesService } from "./notes-tool-bar/notes.service";
import {
  CommentsComponent,
  DeleteCommentDialogueComponent
} from "./comments/comments.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  // TODO double check if NavBarComponent, DetailsSideNavComponent
  // are needed to be imported and/or exported as the RecordDetailsComponent
  // already encapsulate both of them
  declarations: [
    NavBarComponent,
    DetailsSideNavComponent,
    RecordDetailsComponent,
    NotesToolBarComponent,
    DeleteCommentDialogueComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([DetailsSideNavState])
  ],
  providers: [
    DetailsSideNavService,
    CommentsService,
    NotesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [
    NavBarComponent,
    DetailsSideNavComponent,
    RecordDetailsComponent,
    CommentsComponent
  ],
  entryComponents: [DeleteCommentDialogueComponent]
})
export class DetailsModule {}
