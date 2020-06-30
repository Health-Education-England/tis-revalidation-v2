import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar
} from "@angular/material/snack-bar";
import { environment } from "@environment";
import { Store } from "@ngxs/store";
import { AWSError, CognitoIdentityServiceProvider } from "aws-sdk";
import {
  ListUsersInGroupRequest,
  ListUsersResponse
} from "aws-sdk/clients/cognitoidentityserviceprovider";
import { GetError, GetSuccess } from "../state/admins.actions";

@Injectable({
  providedIn: "root"
})
export class AdminsService {
  constructor(private store: Store, private snackBar: MatSnackBar) {}

  public get listUsersInGroupRequest(): ListUsersInGroupRequest {
    return {
      UserPoolId: environment.awsConfig.userPoolId,
      GroupName: "site-admin-group"
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

  public getAdminUsers(): void {
    this.awsCognito.listUsersInGroup(
      this.listUsersInGroupRequest,
      (error: AWSError, response: ListUsersResponse) => {
        if (error) {
          const errorMsg = `Error: ${error.message}`;
          this.openSnackBar(errorMsg);
          this.store.dispatch(new GetError(errorMsg));
        } else {
          this.store.dispatch(new GetSuccess(response.Users));
        }
      }
    );
  }

  private openSnackBar(message: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, "Close", {
      duration: 5000
    });
  }
}
