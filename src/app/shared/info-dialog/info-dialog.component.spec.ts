import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MaterialModule } from "src/app/shared/material/material.module";
import { InfoDialogComponent } from "./info-dialog.component";

describe("InfoDialogComponent", () => {
  let component: InfoDialogComponent;
  let fixture: ComponentFixture<InfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
      declarations: [InfoDialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
