import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
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
import { MaterialAutocompleteComponent } from "./form-controls/material-autocomplete/material-autocomplete.component";
import { RemoveWhitespacePipe } from "./pipes/remove-whitespace.pipe";
import { SplitStringToHTMLPipe } from "./pipes/split-string-to-html.pipe";
import { FormatDesignatedBodyPipe } from "./pipes/format-designated-body.pipe";
import { MaterialCheckboxComponent } from "./form-controls/material-checkbox/material-checkbox.component";
import { MaterialDateRangePickerComponent } from "./form-controls/material-date-range-picker/material-date-range-picker.component";

const modulePipes = [
  StripHtmlPipe,
  FileBytesPipe,
  SplitStringToHTMLPipe,
  RemoveWhitespacePipe,
  FormatDesignatedBodyPipe
];
@NgModule({
  declarations: [
    PageNotFoundComponent,
    ConfirmDialogComponent,
    ...modulePipes,
    InfoDialogComponent,
    FormControllerComponent,
    MaterialSelectionListComponent,
    MaterialAutocompleteComponent,

    SplitStringToHTMLPipe,
    MaterialCheckboxComponent,
    MaterialDateRangePickerComponent
  ],
  imports: [RouterModule, MaterialModule, ReactiveFormsModule, CommonModule],
  exports: [...modulePipes, FormControllerComponent],
  providers: [ApiService, DatePipe]
})
export class SharedModule {}
