import { Component, OnInit } from "@angular/core";
import { map, Observable, skip } from "rxjs";
import { RecordsService } from "../services/records.service";
import { Store } from "@ngxs/store";
import { FormBuilder, FormGroup } from "@angular/forms";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";

@Component({
  selector: "app-record-list-columns",
  templateUrl: "./record-list-columns.component.html",
  styleUrls: ["./record-list-columns.component.scss"]
})
export class RecordListColumnsComponent implements OnInit {
  public displayColumns$: Observable<string[]> = this.store.select(
    (state) => state[this.recordsService.stateName].displayColumns
  );

  constructor(
    readonly recordsService: RecordsService,
    readonly store: Store,
    readonly fb: FormBuilder,
    readonly localStorageService: LocalStorageService
  ) {}

  isColumnsHidden: boolean;
  columnData = this.recordsService.columnData;
  form: FormGroup;

  columnsHidden(columns): boolean {
    if (columns.length < this.columnData.length) {
      return true;
    }
    return false;
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      tableColumns: [[]]
    });

    this.displayColumns$.subscribe((columns) => {
      this.form.controls.tableColumns.setValue(columns);
      this.isColumnsHidden = this.columnsHidden(columns);
    });

    this.form.get("tableColumns")?.valueChanges.subscribe((displayColumns) => {
      this.isColumnsHidden = this.columnsHidden(displayColumns);

      this.recordsService.setDisplayTableColumns(displayColumns);
      this.localStorageService.setItem(
        "ConnectionsDisplayColumns",
        displayColumns
      );
    });
  }
}
