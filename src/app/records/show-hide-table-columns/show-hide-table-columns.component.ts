import { Component, OnInit } from "@angular/core";
import { RecordsService } from "../services/records.service";
import { IRecordDataCell } from "../records.interfaces";
import { Observable } from "rxjs";
import { LocalService } from "src/app/shared/services/local/local.service";

@Component({
  selector: "app-show-hide-table-columns",
  templateUrl: "./show-hide-table-columns.component.html",
  styleUrls: ["./show-hide-table-columns.component.scss"]
})
export class ShowHideTableColumnsComponent implements OnInit {
  constructor(
    public recordsService: RecordsService,
    private localService: LocalService
  ) {}
  columnData: IRecordDataCell[] = this.recordsService.columnData;
  selectedColumns: string[];
  columnsToDisplay: string[];
  onSelection(selectedOptions) {
    this.recordsService.columnsToDisplay$.next(
      selectedOptions.map((option) => option.value)
    );
  }
  ngOnInit(): void {
    this.recordsService.columnsToDisplay$.subscribe((columns) => {
      this.columnsToDisplay = columns;
      this.localService.updateCustomData(
        `${this.recordsService.stateName}TableColumns`,
        columns
      );
    });
  }
}
