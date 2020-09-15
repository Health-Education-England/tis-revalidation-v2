import { CommonModule } from "@angular/common";
import { ColumnFilterComponent } from "./column-filter/column-filter.component";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminsModule } from "../admins/admins.module";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { RecordListFiltersComponent } from "./record-list-filters/record-list-filters.component";
import { RecordListPaginatorComponent } from "./record-list-paginator/record-list-paginator.component";
import { RecordListComponent } from "./record-list/record-list.component";
import { RecordSearchComponent } from "./record-search/record-search.component";
import { RecordsComponent } from "./records.component";
import { RefreshDataBtnComponent } from "./refresh-data-btn/refresh-data-btn.component";
import { ResetRecordListComponent } from "./reset-record-list/reset-record-list.component";
import { RecordsService } from "./services/records.service";
import { SelectedColumnFiltersComponent } from "./selected-column-filters/selected-column-filters.component";

const components: any[] = [
  ColumnFilterComponent,
  RecordListComponent,
  RecordListFiltersComponent,
  RecordListPaginatorComponent,
  RecordsComponent,
  RecordSearchComponent,
  RefreshDataBtnComponent,
  ResetRecordListComponent,
  SelectedColumnFiltersComponent
];

@NgModule({
  declarations: components,
  providers: [RecordsService],
  imports: [
    CommonModule,
    MaterialModule,
    AdminsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: components
})
export class RecordsModule {}
