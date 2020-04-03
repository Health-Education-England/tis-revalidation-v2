import { NgModule } from "@angular/core";
import { LayoutModule } from "@angular/cdk/layout";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatBadgeModule } from "@angular/material/badge";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

const materialModules = [
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatExpansionModule,
  MatBadgeModule,
  MatTooltipModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatCardModule,
  MatTabsModule,
  MatBottomSheetModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatSortModule
];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" }
  ]
})
export class MaterialModule {}
