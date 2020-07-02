import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { AllocateAdminBtnComponent } from "./allocate-admin-btn/allocate-admin-btn.component";
import { RecordListComponent } from "./record-list/record-list.component";
import { RecordSearchComponent } from "./record-search/record-search.component";
import { ResetRecordListComponent } from "./reset-record-list/reset-record-list.component";

const components: any[] = [
  RecordListComponent,
  RecordSearchComponent,
  ResetRecordListComponent,
  AllocateAdminBtnComponent
];

@NgModule({
  declarations: components,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: components
})
export class RecordsModule {}
