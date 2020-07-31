import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { ListUsersResponse } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { MaterialModule } from "../../shared/material/material.module";
import { AdminsState } from "../state/admins.state";

import { AdminsService } from "./admins.service";

export const mockAdminsResponse: ListUsersResponse = {
  Users: [
    {
      Attributes: [
        { Name: "sub", Value: "2c6df0c3-ded9-4669-9e89-ac719ad84493" },
        { Name: "email", Value: "siteadmin@hee.nhs.uk" }
      ],
      Enabled: true,
      UserCreateDate: new Date(),
      UserLastModifiedDate: new Date(),
      UserStatus: "CONFIRMED",
      Username: "siteadmin@hee.nhs.uk"
    }
  ]
};

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
