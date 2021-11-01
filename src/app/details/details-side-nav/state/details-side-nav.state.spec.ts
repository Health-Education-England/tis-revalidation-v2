import { TestBed, async, fakeAsync } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { IDetailsSideNav } from "../details-side-nav.interfaces";
import { INote } from "../../notes-drawer/notes-drawer.interfaces";
import { DetailsSideNavState } from "./details-side-nav.state";
import {
  Get as DetailsSideNavAction,
  AddNote,
  EditNote
} from "./details-side-nav.actions";
import { environment } from "@environment";
import { detailsSideNavResponse } from "src/app/recommendation/mock-data/recommendation-spec-data";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";

describe("DetailsSideNav actions", () => {
  let store: Store;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([DetailsSideNavState])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it("should create an action and add an item", fakeAsync(() => {
    const gmcNumber = 1234;

    store.dispatch(new DetailsSideNavAction(gmcNumber));

    const req = httpMock.expectOne(
      `${environment.appUrls.getDetails}/${gmcNumber}`
    );
    expect(req.request.method).toEqual("GET");
    req.flush(detailsSideNavResponse);

    const item: IDetailsSideNav = store.selectSnapshot(
      (state) => state.traineeDetails.item
    );

    expect(item).toEqual(detailsSideNavResponse);
  }));

  it("should add a note to existing state", fakeAsync(() => {
    const initialState = store.selectSnapshot(
      (state) => state.traineeDetails.item
    );
    expect(initialState.notes.length).toEqual(0);

    const note: INote = {
      gmcId: 123,
      text: "test",
      id: 123,
      edit: false,
      updatedDate: new Date()
    };
    store.dispatch(new AddNote(note));

    const finalState = store.selectSnapshot(
      (state) => state.traineeDetails.item
    );
    expect(finalState.notes.length).toEqual(1);
  }));

  it("should edit a note to existing state", fakeAsync(() => {

    // Set initial notes in state
    const note: INote = {
      gmcId: 123,
      text: "test",
      id: 123,
      updatedDate: new Date()
    };
    store.dispatch(new AddNote(note));

    store.reset({
      ...store.snapshot(),
      item: {
        notes: [...[note]]
      }
    });

    const initState = store.selectSnapshot(
      (state) => state.traineeDetails.item
    );
    expect(initState.notes.length).toEqual(1);
    

    // Edit note
    const editNote: INote = {
      gmcId: 123,
      text: "test edit",
      id: 123,
      updatedDate: new Date()
    };
    store.dispatch(new EditNote(editNote));

    const finalState = store.selectSnapshot(
      (state) => state.traineeDetails.item
    );
    expect(finalState.notes.length).toEqual(1);
    expect(finalState.notes[0].text).toEqual("test edit");
  }));

  afterEach(() => {
    httpMock.verify();
  });
});
