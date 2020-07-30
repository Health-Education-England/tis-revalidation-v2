import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import { Store } from "@ngxs/store";
import { AWSError, CognitoIdentityServiceProvider } from "aws-sdk";
import {
  ListUsersInGroupRequest,
  ListUsersResponse
} from "aws-sdk/clients/cognitoidentityserviceprovider";
import { IAllocateAdmin } from "../admins.interfaces";
import { GetError, GetSuccess } from "../state/admins.actions";

@Injectable({
  providedIn: "root"
})
export class AdminsService {
  constructor(private store: Store, private http: HttpClient) {}

  public listUsersInGroupRequest(groupName: string): ListUsersInGroupRequest {
    return {
      UserPoolId: environment.awsConfig.userPoolId,
      GroupName: groupName
    };
  }

  public get awsCognito(): any {
    return new CognitoIdentityServiceProvider({
      region: environment.awsConfig.region,
      credentials: {
        accessKeyId: environment.awsConfig.accessKeyId,
        secretAccessKey: environment.awsConfig.secretAccessKey
      }
    });
  }

  public getAdminUsers(groupName: string): void {
    this.awsCognito.listUsersInGroup(
      this.listUsersInGroupRequest(groupName),
      (error: AWSError, response: ListUsersResponse) => {
        if (error) {
          const errorMsg = `Error: ${error.message}`;
          this.store.dispatch(new GetError(errorMsg));
        } else {
          this.store.dispatch(new GetSuccess(response.Users));
        }
      }
    );
  }

  public submitAllocateList(payload: IAllocateAdmin[]) {
    return this.http.post(`${environment.appUrls.allocateAdmin}`, {
      traineeAdmins: payload
    });
  }
}
