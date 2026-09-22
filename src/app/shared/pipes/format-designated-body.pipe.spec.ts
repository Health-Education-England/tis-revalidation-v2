import { FormatDesignatedBodyPipe } from "./format-designated-body.pipe";
import { Store, NgxsModule } from "@ngxs/store";
import { TestBed, waitForAsync } from "@angular/core/testing";
import {
  provideHttpClient,
  withInterceptorsFromDi
} from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { mockDbcs } from "src/app/reference/mock-data/reference-spec.data";
import { IDesignatedBody } from "src/app/reference/reference.interfaces";
import { ReferenceState } from "src/app/reference/state/reference.state";

describe("FormatDesignatedBodyPipe", () => {
  let store: Store;
  let pipe: FormatDesignatedBodyPipe;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ReferenceState])],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      reference: { ...store.snapshot().reference, dbcs: mockDbcs }
    });
  }));

  it("create an instance", () => {
    pipe = new FormatDesignatedBodyPipe(store);
    expect(pipe).toBeTruthy();
  });

  it("should map dbc value to expected output ", () => {
    pipe = new FormatDesignatedBodyPipe(store);
    const db: IDesignatedBody = {
      id: 1,
      dbc: "1-AIIDMQ",
      name: "Health Education England South West",
      abbr: "HESW",
      status: "internal"
    };

    let text = pipe.transform(db.dbc);
    expect(text).toContain(db.dbc);
    text = pipe.transform(db.dbc, "abbr");
    expect(text).toContain(db.abbr);
    text = pipe.transform(db.dbc, "name");
    expect(text).toContain(db.name);
  });
  it("should return original value if multiple matches found ", () => {
    const mockDbcsWithDuplicates = [
      {
        id: 1,
        dbc: "1-AIIDMQ",
        name: "Health Education England South West",
        abbr: "HESW",
        status: "internal"
      },
      {
        id: 2,
        dbc: "1-AIIDMQ",
        name: "Health Education England South West",
        abbr: "HESW",
        status: "internal"
      }
    ];
    store.reset({
      ...store.snapshot(),
      reference: { ...store.snapshot().reference, dbcs: mockDbcsWithDuplicates }
    });
    pipe = new FormatDesignatedBodyPipe(store);

    const db: IDesignatedBody = {
      id: 1,
      dbc: "1-AIIDMQ",
      name: "Health Education England South West",
      abbr: "HESW",
      status: "internal"
    };

    let text = pipe.transform(db.name, "abbr");
    expect(text).toContain(db.name);
  });
});
