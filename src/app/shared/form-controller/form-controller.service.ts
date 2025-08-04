import { Injectable } from "@angular/core";
import { AuthService } from "src/app/core/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class FormControllerService {
  constructor(private authService: AuthService) {}

  public get userDesignatedBodies() {
    return this.authService.userDesignatedBodies.join();
  }
}
