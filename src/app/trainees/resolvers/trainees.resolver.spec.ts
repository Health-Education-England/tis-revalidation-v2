import { TraineesResolver } from "./trainees.resolver";
import { Store, NgxsModule } from "@ngxs/store";
import { TestBed, async } from "@angular/core/testing";
import { TraineesState } from "../state/trainees.state";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

describe("TraineesResolver", () => {
  let traineeStore: Store;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([TraineesState])],
      providers: []
    }).compileComponents();
    traineeStore = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it("should create an instance", () => {
    expect(new TraineesResolver(traineeStore)).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
