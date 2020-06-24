import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TraineesService } from "../trainees.service";
import { BehaviorSubject } from "rxjs";
import { environment } from "@environment";

@Component({
  selector: "app-trainees-list",
  templateUrl: "./trainees-list.component.html"
})
export class TraineesListComponent implements OnInit {
  public dateFormat: string = environment.dateFormat;

  constructor(public traineesService: TraineesService) {}

  ngOnInit(): void {}

  public navigateToDetails(event: Event, row: any): Promise<boolean> {
    event.stopPropagation();
    const gmcNumber = Number(row.gmcReferenceNumber);
    return this.traineesService.navigateToDetails(gmcNumber);
  }
}
