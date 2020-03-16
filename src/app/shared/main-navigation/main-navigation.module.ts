import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DesktopMenuComponent } from "./mat-main-nav/desktop-menu/desktop-menu.component";
import { MatMainNavComponent } from "./mat-main-nav/mat-main-nav.component";
import { StatusBarComponent } from "./mat-main-nav/status-bar/status-bar.component";
import { MobileMenuComponent } from "./mat-main-nav/mobile-menu/mobile-menu.component";
import { MaterialModule } from "../material/material.module";
import { RouterModule } from "@angular/router";

const navComponents = [
  MatMainNavComponent,
  StatusBarComponent,
  MobileMenuComponent,
  DesktopMenuComponent
];

@NgModule({
  declarations: [...navComponents],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [...navComponents]
})
export class MainNavigationModule {}
