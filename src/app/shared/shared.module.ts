import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material/material.module";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ApiService } from "./services/api/api.service";
import { StripHtmlPipe } from "./strip-html.pipe";
import { FileBytesPipe } from "./file-bytes.pipe";
import { InfoDialogComponent } from "./info-dialog/info-dialog.component";
import { FormControllerComponent } from "./form-controller/form-controller.component";
import { MaterialSelectionListComponent } from "./form-controls/material-selection-list/material-selection-list.component";
import { MaterialAutocompleteComponent } from './form-controls/material-autocomplete/material-autocomplete.component';
import { RemoveWhitespacePipe } from './pipes/remove-whitespace.pipe';

const modulePipes = [StripHtmlPipe, FileBytesPipe];
@NgModule({
  declarations: [
    PageNotFoundComponent,
    ConfirmDialogComponent,
    ...modulePipes,
    InfoDialogComponent,
    FormControllerComponent,
    MaterialSelectionListComponent,
    MaterialAutocompleteComponent,
    RemoveWhitespacePipe
  ],
  imports: [RouterModule, MaterialModule, ReactiveFormsModule, CommonModule],
  exports: [...modulePipes, FormControllerComponent],
  providers: [ApiService]
})
export class SharedModule {}
