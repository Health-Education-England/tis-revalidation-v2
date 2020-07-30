import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { AllocateAdminActionsComponent } from "../shared/admins/allocate-admin-actions/allocate-admin-actions.component";
import { AllocateAdminBtnComponent } from "../shared/admins/allocate-admin-btn/allocate-admin-btn.component";
import { RecordListComponent } from "./record-list/record-list.component";
import { RecordSearchComponent } from "./record-search/record-search.component";
import { RefreshDataBtnComponent } from "./refresh-data-btn/refresh-data-btn.component";
import { ResetRecordListComponent } from "./reset-record-list/reset-record-list.component";

const components: any[] = [
  AllocateAdminActionsComponent,
  AllocateAdminBtnComponent,
  RecordListComponent,
  RecordSearchComponent,
  RefreshDataBtnComponent,
  ResetRecordListComponent
];

@NgModule({
  declarations: components,
  imports: [CommonModule, MaterialModule, SharedModule, ReactiveFormsModule],
  exports: components
})
export class RecordsModule {}
