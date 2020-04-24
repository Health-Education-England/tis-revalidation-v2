import { TestBed, async } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RevalidationNotesState } from "./revalidation-notes.state";
import { GetRevalidationNotes } from "./revalidation-notes.actions";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { INote } from "../revalidation-history.interface";
import { notesResponse1 } from "../mock-data/trainee-spec-data";
import { environment } from "@environment";

describe("RevalidationNotes actions", () => {
  let store: Store;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([RevalidationNotesState]),
        HttpClientTestingModule
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it("should create an action and edit a note", () => {
    const gmcId = 1234;

    store.dispatch(new GetRevalidationNotes(gmcId));

    const req = httpMock.expectOne(
      `${environment.appUrls.getNotes}?id=${gmcId}`
    );
    expect(req.request.method).toEqual("GET");
    req.flush(notesResponse1);

    const items: INote[] = store.selectSnapshot(
      (state) => state.revalidationNotes.items
    );

    expect(items).toEqual(notesResponse1);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
