import { FormatDesignatedBodyPipe } from "./format-designated-body.pipe";
import { Store, NgxsModule } from "@ngxs/store";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { mockDbcs } from "src/app/reference/mock-data/reference-spec.data";
import { IDesignatedBody } from "src/app/reference/reference.interfaces";

describe("DbcMapperPipe", () => {
  let store: Store;
  let pipe: FormatDesignatedBodyPipe;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])]
    });
    store = TestBed.inject(Store);
  }));

  const createSpy = (designatedBodies: IDesignatedBody[] = mockDbcs) => {
    spyOn(store, "selectSnapshot").and.returnValue({ dbcs: designatedBodies });
    pipe = new FormatDesignatedBodyPipe(store);
  };

  it("create an instance", () => {
    createSpy();
    expect(pipe).toBeTruthy();
  });

  it("should map dbc value to expected output ", () => {
    createSpy();
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
    createSpy(mockDbcsWithDuplicates);

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
