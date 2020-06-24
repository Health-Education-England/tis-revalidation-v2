import { Component } from "@angular/core";
import { TraineesService } from "../trainees.service";

@Component({
  selector: "app-trainees-filter",
  templateUrl: "./trainees-filter.component.html"
})
export class TraineesFilterComponent {
  constructor(public traineeService: TraineesService) {}
}
