import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { Filter } from "../state/concerns.actions";
import { ConcernsFilterType } from "../concerns.interfaces";
import { ConcernsState } from "../state/concerns.state";
import { ConcernListComponent } from "./concern-list.component";

describe("ConcernListComponent", () => {
  let store: Store;
  let component: ConcernListComponent;
  let fixture: ComponentFixture<ConcernListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConcernListComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([ConcernsState])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcernListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("'setupInitialFilter()' should dispatch 'Open' filter if param value is `Open`", () => {
    spyOn(store, "dispatch");

    component.params = { filter: ConcernsFilterType.OPEN };
    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(ConcernsFilterType.OPEN)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new Filter(ConcernsFilterType.CLOSED)
    );
  });

  it("'setupInitialFilter()' should dispatch 'Closed' filter if param does not exist", () => {
    spyOn(store, "dispatch");

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(ConcernsFilterType.CLOSED)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new Filter(ConcernsFilterType.OPEN)
    );
  });
});
