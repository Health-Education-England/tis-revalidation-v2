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
    username: "siteadmin@hee.nhs.uk",
    fullName: "siteadmin@hee.nhs.uk"
  },
  {
    username: "omar_mirza",
    fullName: "omar_mirza"
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
