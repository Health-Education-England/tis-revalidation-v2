import { TestBed, async } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { TraineesState } from "./trainees.state";
import { GetTrainees, GetTrainee } from "./trainees.actions";
import {
  ITraineeRouteParams,
  ITrainee,
  DefaultRouteParams
} from "../trainees.interface";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("Trainees actions", () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([TraineesState])]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it("should create an action GetTrainees and get items", () => {
    const payload: ITraineeRouteParams = DefaultRouteParams;
    store.dispatch(new GetTrainees(payload));
    store
      .select((state) => state.doctors.items)
      .subscribe((items: ITrainee[]) => {
        expect(items).toEqual(jasmine.objectContaining([]));
      });
  });

  xit("should create an action GetTrainee and get single item", () => {
    const payload = 1;
    store.dispatch(new GetTrainee(payload));
    store
      .select((state) => state.doctors.items)
      .subscribe((item: ITrainee) => {
        expect(item).toEqual(jasmine.objectContaining(["item-1"]));
      });
  });
});
