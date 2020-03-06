import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ITrainee } from "../../core/trainee/trainee.interfaces";
import { TraineeService } from "../../core/trainee/trainee.service";

@Component({
  selector: "app-under-notice",
  templateUrl: "./under-notice.component.html"
})
export class UnderNoticeComponent implements OnInit {
  public trainees$: Observable<ITrainee[]>;

  constructor(private traineeService: TraineeService) {}

  ngOnInit(): void {
    this.listTrainees();
  }

  private listTrainees(): void {
    this.trainees$ = this.traineeService.listTrainees();
  }
}
