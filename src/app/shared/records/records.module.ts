import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared.module";
import { RecordListComponent } from "./record-list/record-list.component";

@NgModule({
  declarations: [RecordListComponent],
  imports: [MaterialModule, SharedModule],
  exports: [RecordListComponent]
})
export class RecordsModule {}
