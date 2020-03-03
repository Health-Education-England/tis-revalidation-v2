/**
 * MOCK DUMMY COMPONENTS AND ROUTES
 */
import { Component } from "@angular/core";
import { Routes } from "@angular/router";

@Component({
  selector: "lib-mock",
  template: `
    Mock
  `
})
export class MockComponent {}

@Component({
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}

export const routes: Routes = [{ path: "", component: MockComponent }];
