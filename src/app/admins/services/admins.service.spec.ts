import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../../shared/material/material.module";
import { IAdminDto } from "../admins.interfaces";
import { AdminsState } from "../state/admins.state";
import { AdminsService } from "./admins.service";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

export const mockAdminsResponse: IAdminDto[] = [
  {
    name: "66596851-3b8a-0009",
    firstName: "Site",
    lastName: "Admin",
    emailAddress: "siteadmin@hee.nhs.uk"
  },
  {
    name: "b0737686-1aee-4070",
    firstName: "Mirza",
    lastName: "Mirza",
    emailAddress: "omar_mirza@hee.nhs.uk"
  }
];

describe("AdminsService", () => {
  let service: AdminsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MaterialModule,
        RouterTestingModule,
        NgxsModule.forRoot([AdminsState])],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(AdminsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
