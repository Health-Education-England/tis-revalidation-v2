import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { ConnectionsFilterType } from "../connections.interfaces";
import { Filter } from "../state/connections.actions";
import { ConnectionsState } from "../state/connections.state";
import { ConnectionListComponent } from "./connection-list.component";

describe("ConnectionListComponent", () => {
  let store: Store;
  let component: ConnectionListComponent;
  let fixture: ComponentFixture<ConnectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionListComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([ConnectionsState])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should invoke `setupInitialFilter()` upon ngOnInit", () => {
    spyOn(component, "setupInitialFilter");

    component.ngOnInit();
    expect(component.setupInitialFilter).toHaveBeenCalled();
  });

  it("'setupInitialFilter()' should dispatch 'Add Connection' filter if param value is `Add Connection`", () => {
    spyOn(store, "dispatch");

    component.params = { filter: ConnectionsFilterType.ADD_CONNECTION };
    component.setupInitialFilter();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(ConnectionsFilterType.ADD_CONNECTION)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new Filter(ConnectionsFilterType.ALL)
    );
  });

  it("'setupInitialFilter()' should dispatch 'All' filter if param does not exist", () => {
    spyOn(store, "dispatch");

    component.setupInitialFilter();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Filter(ConnectionsFilterType.ALL)
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new Filter(ConnectionsFilterType.ADD_CONNECTION)
    );
  });
});
