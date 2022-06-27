import { Component } from "@angular/core";
import {
  IRecommendationSummary,
  RecommendationGmcOutcome,
  RecommendationType,
  RecommendationStatus,
  IRecommendationHistory
} from "../recommendation-history.interface";
import { environment } from "@environment";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { Select } from "@ngxs/store";
import { RecommendationHistoryState } from "../state/recommendation-history.state";
import { Observable } from "rxjs";
import { AuthService } from "src/app/core/auth/auth.service";

@Component({
  selector: "app-recommendation-table",
  templateUrl: "./recommendation-table.component.html",
  styleUrls: [
    "./recommendation-table.component.scss",
    "../../details/details.table.scss"
  ],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class RecommendationTableComponent {
  columnsToDisplay = [
    "recommendationType",
    "gmcOutcome",
    "gmcSubmissionDate",
    "actualSubmissionDate",
    "admin"
  ];
  expandedElement: IRecommendationSummary | null;
  dateFormat = environment.dateFormat;

  recommendationGmcOutcome = RecommendationGmcOutcome;
  recommendationType = RecommendationType;
  recommendationStatus = RecommendationStatus;

  @Select(RecommendationHistoryState.recommendationHistory)
  recommendation$: Observable<IRecommendationHistory>;

  @Select(RecommendationHistoryState.recommendationSummary)
  recommendationHistory$: Observable<IRecommendationSummary[]>;
  @Select(RecommendationHistoryState.enableRecommendation)
  enableRecommendation$: Observable<boolean>;
  @Select(RecommendationHistoryState.editRecommendation)
  editRecommendation$: Observable<boolean>;
  enableRecommendation: boolean;
  gmcSubmissionDate: Date;
  submissionDueStatusStyle: string;

  convertToDays(milisecs: number) {
    return Math.round(milisecs / 1000 / 60 / 60 / 24);
  }

  constructor(private authService: AuthService) {
    this.enableRecommendation$.subscribe(
      (value) =>
        (this.enableRecommendation = value && this.authService.isRevalAdmin)
    );

    this.recommendation$.subscribe((recommendation: IRecommendationHistory) => {
      // this.gmcSubmissionDate = recommendation.gmcSubmissionDate;
      this.gmcSubmissionDate = new Date("2022-05-30");

      const d = new Date(this.gmcSubmissionDate).getTime();

      const t = new Date().getTime();
      const diffInDays = this.convertToDays(t - d);
      if (diffInDays > 0) {
        this.submissionDueStatusStyle = "alert-danger";
      } else if (diffInDays > -14 && diffInDays <= 0) {
        this.submissionDueStatusStyle = "alert-warning";
      } else {
        this.submissionDueStatusStyle = "alert-success";
      }
      console.log((t - d) / 1000 / 60 / 60 / 24);
    });
  }

  currentExpanded(element: any, event: Event) {
    event.stopPropagation();
    this.expandedElement = this.expandedElement === element ? null : element;
  }
}
