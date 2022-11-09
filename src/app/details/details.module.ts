import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../shared/material/material.module";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { DetailsSideNavComponent } from "./details-side-nav/details-side-nav.component";
import { DetailsSideNavService } from "./details-side-nav/service/details-side-nav.service";
import { NgxsModule } from "@ngxs/store";
import { DetailsSideNavState } from "./details-side-nav/state/details-side-nav.state";
import { NotesDrawerState } from "./notes-drawer/state/notes-drawer.state";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "src/app/core/auth/auth.interceptor";
import { RecordDetailsComponent } from "./record-details/record-details.component";
import { NotesToolBarComponent } from "./notes-tool-bar/notes-tool-bar.component";
import { NotesDrawerComponent } from "./notes-drawer/notes-drawer.component";
import { CommentsService } from "./comments/comments.service";
import { NotesService } from "./notes-tool-bar/notes.service";
import {
  CommentsComponent,
  DeleteCommentDialogueComponent
} from "./comments/comments.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpErrorInterceptor } from "../core/http-error/http-error.interceptor";
import { NoteCardComponent } from "./notes-drawer/note-card/note-card.component";
import { ToolBarComponent } from "./tool-bar/tool-bar.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  // TODO double check if NavBarComponent, DetailsSideNavComponent
  // are needed to be imported and/or exported as the RecordDetailsComponent
  // already encapsulate both of them
  declarations: [
    NavBarComponent,
    DetailsSideNavComponent,
    RecordDetailsComponent,
    NotesToolBarComponent,
    NotesDrawerComponent,
    DeleteCommentDialogueComponent,
    CommentsComponent,
    NoteCardComponent,
    ToolBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    NgxsModule.forFeature([DetailsSideNavState, NotesDrawerState])
  ],
  providers: [
    DetailsSideNavService,
    CommentsService,
    NotesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  exports: [
    NavBarComponent,
    DetailsSideNavComponent,
    RecordDetailsComponent,
    CommentsComponent
  ]
})
export class DetailsModule {}
