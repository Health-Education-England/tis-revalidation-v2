import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminsModule } from "../admins/admins.module";
import { CommentsComponent } from "./comments/comments.component";
import { ConcernComponent } from "./concern.component";
import { ConcernResolver } from "./resolvers/concern.resolver";
import { ConcernRoutingModule } from "./concern-routing.module";
import { ConcernsService } from "../concerns/services/concerns.service";
import { ConcernState } from "./state/concern.state";
import { CreateConcernComponent } from "./create-concern/create-concern.component";
import { DetailsModule } from "../details/details.module";
import { FileUploaderComponent } from "./file-uploader/file-uploader.component";
import { MaterialModule } from "../shared/material/material.module";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { SharedModule } from "../shared/shared.module";
import { UploadedFilesListComponent } from "./uploaded-files-list/uploaded-files-list.component";
import { ConcernDetailComponent } from "./create-concern-forms/concern-detail/concern-detail.component";
import { TraineeDetailComponent } from "./create-concern-forms/trainee-detail/trainee-detail.component";
import { UploadDocumentsComponent } from "./create-concern-forms/upload-documents/upload-documents.component";
import { CreateEditConcernResolver } from "./resolvers/create-edit-concern.resolver";

@NgModule({
  declarations: [
    CommentsComponent,
    ConcernComponent,
    ConcernDetailComponent,
    CreateConcernComponent,
    FileUploaderComponent,
    TraineeDetailComponent,
    UploadedFilesListComponent,
    UploadDocumentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    AdminsModule,
    ConcernRoutingModule,
    DetailsModule,
    NgxsModule.forFeature([ConcernState])
  ],
  providers: [ConcernsService, ConcernResolver, CreateEditConcernResolver]
})
export class ConcernModule {}
