import { TestBed, waitForAsync } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RecommendationNotesState } from "./recommendation-notes.state";
import { GetRecommendationNotes } from "./recommendation-notes.actions";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { INote } from "../recommendation-history.interface";
import { notesResponse1 } from "../mock-data/recommendation-spec-data";
import { environment } from "@environment";

describe("RecommendationNotes actions", () => {
  let store: Store;
  let httpMock: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          NgxsModule.forRoot([RecommendationNotesState]),
          HttpClientTestingModule
        ]
      }).compileComponents();
      store = TestBed.inject(Store);
      httpMock = TestBed.inject(HttpTestingController);
    })
  );

  it("should create an action and edit a note", () => {
    const gmcNumber = 1234;

    store.dispatch(new GetRecommendationNotes(gmcNumber));

    const req = httpMock.expectOne(
      `${environment.appUrls.getNotes}?id=${gmcNumber}`
    );
    expect(req.request.method).toEqual("GET");
    req.flush(notesResponse1);

    const items: INote[] = store.selectSnapshot(
      (state) => state.recommendationNotes.items
    );

    expect(items).toEqual(notesResponse1);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
