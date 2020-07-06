import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { AdminsState } from "../../admins/state/admins.state";
import { MaterialModule } from "../../material/material.module";

import { AllocateAdminAutocompleteComponent } from "./allocate-admin-autocomplete.component";

describe("AllocateAdminAutocompleteComponent", () => {
  let component: AllocateAdminAutocompleteComponent;
  let fixture: ComponentFixture<AllocateAdminAutocompleteComponent>;

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateAdminAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
