import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { EMPTY } from "rxjs";
import { authWrapper } from "./auth-wrapper";
import { AuthSession } from "aws-amplify/auth";

describe("AuthService", () => {
  let service: AuthService;
  let http: HttpClient;
  const defaultPayload: { [key: string]: any } = {
    given_name: "Name",
    family_name: "FName"
  };
  const userNameClaimKey = "preferred_username";
  defaultPayload[userNameClaimKey] = "dummy@dummy.com";
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
    spyOn(authWrapper, "fetchAuthSession").and.callFake(() =>
      Promise.resolve(createMockSession(defaultPayload))
    );

    service.currentSession().subscribe((curresntSession) => {
      expect(service.userName).toBe("dummy@dummy.com");
      expect(service.fullName).toBe("Name FName");
      expect(service.isRevalAdmin).toBeFalsy();
      expect(service.inludesLondonDbcs).toBeFalsy();
    });
  });

  it("should isRevalAdmin to be truthy when user has any of the admin role", () => {
    const payload: { [key: string]: any } = { ...defaultPayload };
    payload["cognito:roles"] = ["role1", "role2", "RevalAdmin"];

    spyOn(authWrapper, 'fetchAuthSession').and.callFake(() =>
      Promise.resolve(createMockSession(payload))
    );

    service.currentSession().subscribe((curresntSession) => {
      expect(service.isRevalAdmin).toBeTruthy();
    });
  });

  it("should include all london dbcs in userDesignatedBodies when user is assigned to any london dbc", () => {
    const payload: { [key: string]: any } = { ...defaultPayload };
    payload["cognito:groups"] = ["1-DBC", "2-DBC", "1-1RUZV1D"];

    spyOn(authWrapper, 'fetchAuthSession').and.callFake(() =>
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

    spyOn(authWrapper, 'fetchAuthSession').and.callFake(() =>
      Promise.resolve(createMockSession(payload))
    );

    service.currentSession().subscribe((curresntSession) => {
      expect(service.roles.length).toBe(0);
    });
  });

  it("should dbcs be empty when user cognito:groups is null", () => {
    const payload: { [key: string]: any } = { ...defaultPayload };
    payload["cognito:groups"] = null;

    spyOn(authWrapper, 'fetchAuthSession').and.callFake(() =>
      Promise.resolve(createMockSession(payload))
    );

    service.currentSession().subscribe((curresntSession) => {
      expect(service.userDesignatedBodies.length).toBe(0);
    });
  });

  it("should invoke Auth federated signin when currentsession is not avaialbel", () => {
    spyOn(service, "currentSession").and.returnValue(EMPTY);

    spyOn(service, "signIn");

    service.currentSession().subscribe(
      () => {},
      (error) => {
        expect(service.signIn).toHaveBeenCalled();
      }
    );
  });

  it("should invoke Auth federated signin when signin called", async () => {
    const signInWithRedirect = "signInWithRedirect";
    spyOn(authWrapper, signInWithRedirect).and.returnValue(Promise.resolve());

    await service.signIn();
    expect(authWrapper[signInWithRedirect]).toHaveBeenCalled();
  });

  it("should invoke Auth signOut when signOut called", async () => {
    const signOut = "signOut";
    spyOn(authWrapper, signOut).and.returnValue(Promise.resolve());

    await service.signOut();
    expect(authWrapper[signOut]).toHaveBeenCalled();
  });

  function createMockSession(payload: {
    [key: string]: any;
  }): AuthSession {
    return {
      tokens: {
        idToken: {
          payload,
          toString: () => null,
        },
        accessToken: {
          payload,
          toString: () => null,
        }
      }
    };
  }
});
