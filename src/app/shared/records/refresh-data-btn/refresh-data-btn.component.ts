import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-refresh-data-btn",
  templateUrl: "./refresh-data-btn.component.html"
})
export class RefreshDataBtnComponent {
  constructor(private recordsService: RecordsService) {}

  public refreshData(): Observable<any> {
    return this.recordsService.get();
  }
}
