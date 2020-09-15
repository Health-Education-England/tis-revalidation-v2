import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select/select";
import { RecordsService } from "../services/records.service";

@Component({
  selector: "app-column-filter",
  templateUrl: "./column-filter.component.html",
  styleUrls: ["./column-filter.component.scss"]
})
export class ColumnFilterComponent implements OnInit {
  @Input() columnName: string;
  @Input() columnDisplayName: string;

  columnFilter = new FormControl();
  columnFilterSearch = new FormControl();
  showFilter = false;
  toppingList: string[] = [
    "Extra cheese",
    "Mushroom",
    "Onion",
    "Pepperoni",
    "Sausage",
    "Tomato"
  ];
  constructor(private recordsService: RecordsService) {}

  ngOnInit(): void {}

  filterOptions(e: Event): void {
    e.stopPropagation();
    this.showFilter = !this.showFilter;
  }

  matOpenChange(e: boolean): void {
    this.showFilter = e;
  }

  public selectFilter($event: MatSelectChange): void {
    const filteredColumn = { [this.columnName]: $event.value };
    this.recordsService.selectFilter(filteredColumn);
  }

  // TODO add ui btn in html and bind here
  public applyFilters(): void {
    this.recordsService.get();
  }

  // TODO reset ui btn in html and bind here
  public resetFilters(): void {
    // TODO clean up state
    this.recordsService.resetFilters();
  }
}
