import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { IAdmin } from "../admins.interfaces";
import { AdminsState } from "../state/admins.state";
import { AdminsService } from "./admins.service";

export const mockAdminsResponse: IAdmin[] = [
  {
    username: "66596851-3b8a-0009",
    fullName: "Site Admin",
    email: "siteadmin@hee.nhs.uk"
  },
  {
    username: "b0737686-1aee-4070",
    fullName: "Omar Mirza",
    email: "omar_mirza@hee.nhs.uk"
  }
];

describe("AdminsService", () => {
  let service: AdminsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([AdminsState])
      ]
    });
    service = TestBed.inject(AdminsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
