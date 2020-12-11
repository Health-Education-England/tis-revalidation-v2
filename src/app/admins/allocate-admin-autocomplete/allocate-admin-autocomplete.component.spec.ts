import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { AdminsState } from "../state/admins.state";
import { MaterialModule } from "../../shared/material/material.module";

import { AllocateAdminAutocompleteComponent } from "./allocate-admin-autocomplete.component";
import { AdminsService } from "../services/admins.service";
import { IAdmin } from "../admins.interfaces";
import { AddToAllocateList } from "../state/admins.actions";

describe("AllocateAdminAutocompleteComponent", () => {
  let component: AllocateAdminAutocompleteComponent;
  let fixture: ComponentFixture<AllocateAdminAutocompleteComponent>;
  let store: Store;
  let adminsService: AdminsService;
  const fullName = "dummy dummy";
  const admin: IAdmin = {
    email: "dummy@dummy.com",
    fullName,
    username: "dummy@dymmy.com"
  };

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
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    adminsService = TestBed.inject(AdminsService);
    fixture = TestBed.createComponent(AllocateAdminAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store.reset({
      admins: {
        items: [
          admin,
          {
            email: "yummy@yummy.com",
            fullName: "yummy yummy",
            username: "yummy"
          }
        ],
        allocateList: []
      }
    });
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get admin fullName when displayWith() is invoked with IAdmin", () => {
    expect(component.displayWith(admin)).toBe(fullName);
  });

  it("should get null when displayWith() is invoked with null", () => {
    expect(component.displayWith(null)).toBe(null);
  });

  it("should reset the form when adminsService resetForm$ invoked", () => {
    spyOn(component.form, "reset");

    adminsService.resetForm$.next();
    expect(component.form.reset).toHaveBeenCalled();
  });

  it("should push value into adminsService.selectedAdmin$ when onOptionSelected while gmcNumber is undefined ", () => {
    spyOn(adminsService.selectedAdmin$, "next");
    component.gmcNumber = undefined;
    component.onOptionSelected(admin);

    expect(adminsService.selectedAdmin$.next).toHaveBeenCalledWith(
      admin.username
    );
  });

  it("should dispatch AddToAllocateList with gmcNumber and username when onOptionSelected", () => {
    spyOn(store, "dispatch");
    component.gmcNumber = 123456;
    component.onOptionSelected(admin);

    expect(store.dispatch).toHaveBeenCalledWith(
      new AddToAllocateList(admin.username, 123456)
    );
  });

  it("should prePopulateAdmin when admin is available", () => {
    component.admin = admin.fullName;
    expect(component.prePopulateAdmin()).toBe(admin);
  });
});
