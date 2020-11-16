import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { AdminsState } from "../state/admins.state";
import { MaterialModule } from "../../shared/material/material.module";

import { AllocateAdminAutocompleteComponent } from "./allocate-admin-autocomplete.component";

describe("AllocateAdminAutocompleteComponent", () => {
  let component: AllocateAdminAutocompleteComponent;
  let fixture: ComponentFixture<AllocateAdminAutocompleteComponent>;
  let store: Store;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AllocateAdminAutocompleteComponent],
        imports: [
          ReactiveFormsModule,
          NoopAnimationsModule,
          HttpClientTestingModule,
          RouterTestingModule,
          MaterialModule,
          NgxsModule.forRoot([AdminsState])
        ]
      }).compileComponents();
      store = TestBed.inject(Store);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateAdminAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store.reset({ admins: { items: [] } });
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
