import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { RecommendationHistoryState } from "../state/recommendation-history.state";
import { Observable } from "rxjs";
import { IRecommendationHistory } from "../recommendation-history.interface";
import { UtilitiesService } from "../../shared/services/utilities/utilities.service";
@Component({
  selector: "app-submission-date",
  templateUrl: "./submission-date.component.html",
  styleUrls: ["./submission-date.component.scss"]
})
export class SubmissionDateComponent implements OnInit {
  constructor(private utilsService: UtilitiesService) {}
  @Select(RecommendationHistoryState.recommendationHistory)
  recommendation$: Observable<IRecommendationHistory>;

  gmcSubmissionDate: Date;
  submissionDueStatusStyle: string;

  ngOnInit(): void {
    this.recommendation$.subscribe((recommendation: IRecommendationHistory) => {
      this.gmcSubmissionDate = recommendation.gmcSubmissionDate;
      this.submissionDueStatusStyle =
        "alert-" + this.utilsService.getDueDateStatus(this.gmcSubmissionDate);
    });
  }
}
