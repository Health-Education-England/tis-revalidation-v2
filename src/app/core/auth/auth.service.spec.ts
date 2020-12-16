import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { Auth } from "aws-amplify";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;
  let http: HttpClient;
  const defaultPayload: { [key: string]: any } = {
    given_name: "Name",
    family_name: "FName"
  };
  defaultPayload["custom:preferred_username"] = "dummy@dummy.com";
  defaultPayload["cognito:roles"] = ["role1", "role2"];
  defaultPayload["cognito:groups"] = ["1-DBC", "2-DBC"];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should give the current user session when currentSession is called", () => {
    spyOn(Auth, "currentSession").and.callFake(() =>
      Promise.resolve(createMockSession(defaultPayload))
    );

    service.currentSession().subscribe((curresntSession) => {
      expect(curresntSession.isValid()).toBeTruthy();
      expect(service.userName).toBe("dummy@dummy.com");
      expect(service.fullName).toBe("Name FName");
      expect(service.isSuperAdmin).toBeFalsy();
      expect(service.inludesLondonDbcs).toBeFalsy();
    });
  });

  it("should isSuperAdmin to be truthy when user has any of the admin role", () => {
    const payload: { [key: string]: any } = { ...defaultPayload };
    payload["cognito:roles"] = ["role1", "role2", "RevalSuperAdmin"];

    spyOn(Auth, "currentSession").and.callFake(() =>
      Promise.resolve(createMockSession(payload))
    );

    service.currentSession().subscribe((curresntSession) => {
      expect(service.isSuperAdmin).toBeTruthy();
    });
  });

  it("should include all london dbcs in userDesignatedBodies when user is assigned to any london dbc", () => {
    const payload: { [key: string]: any } = { ...defaultPayload };
    payload["cognito:groups"] = ["1-DBC", "2-DBC", "1-AIIDWA"];

    spyOn(Auth, "currentSession").and.callFake(() =>
      Promise.resolve(createMockSession(payload))
    );

    service.currentSession().subscribe((curresntSession) => {
      expect(service.inludesLondonDbcs).toBeTruthy();
      expect(service.userDesignatedBodies.length).toBe(6);
    });
  });

  it("should roles be empty when user cognito:roles is null", () => {
    const payload: { [key: string]: any } = { ...defaultPayload };
    payload["cognito:roles"] = null;

    spyOn(Auth, "currentSession").and.callFake(() =>
      Promise.resolve(createMockSession(payload))
    );

    service.currentSession().subscribe((curresntSession) => {
      expect(service.roles.length).toBe(0);
    });
  });

  it("should dbcs be empty when user cognito:groups is null", () => {
    const payload: { [key: string]: any } = { ...defaultPayload };
    payload["cognito:groups"] = null;

    spyOn(Auth, "currentSession").and.callFake(() =>
      Promise.resolve(createMockSession(payload))
    );

    service.currentSession().subscribe((curresntSession) => {
      expect(service.userDesignatedBodies.length).toBe(0);
    });
  });

  it("should invoke Auth federated signin when currentsession is not avaialbel", () => {
    spyOn(Auth, "currentSession").and.callFake(() =>
      Promise.reject("Session not available")
    );
    spyOn(service, "signIn");

    service.currentSession().subscribe(
      () => {},
      (error) => {
        expect(service.signIn).toHaveBeenCalled();
      }
    );
  });

  it("should invoke Auth federated signin when signin called", async () => {
    const federatedSignIn = "federatedSignIn";
    spyOn(Auth, federatedSignIn);

    await service.signIn();
    expect(Auth[federatedSignIn]).toHaveBeenCalled();
  });

  it("should invoke Auth signOut when signOut called", async () => {
    const signOut = "signOut";
    spyOn(Auth, signOut);

    await service.signOut();
    expect(Auth[signOut]).toHaveBeenCalled();
  });

  function createMockSession(payload: {
    [key: string]: any;
  }): CognitoUserSession {
    return {
      getIdToken: () => ({
        payload,
        getJwtToken: () => null,
        getIssuedAt: () => null,
        getExpiration: () => null,
        decodePayload: () => null
      }),
      getAccessToken: () => null,
      getRefreshToken: () => null,
      isValid: () => true
    };
  }
});
