import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [],
  imports: [ReactiveFormsModule, RouterModule, HttpClientModule],
  exports: []
})
export class SharedModule {}
