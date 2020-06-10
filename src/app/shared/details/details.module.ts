import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { NavBarComponent } from "./nav-bar/nav-bar.component";

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavBarComponent]
})
export class DetailsModule {}
