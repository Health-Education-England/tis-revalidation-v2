import { Component, OnInit } from "@angular/core";
import { Auth } from "aws-amplify";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  async ngOnInit() {
    // Auth.currentAuthenticatedUser()
    const user = await Auth.currentAuthenticatedUser();
    // config.headers.authorization = `Bearer ${user.signInUserSession.accessToken.jwtToken}`;
    console.log(user);
  }
}
