import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from "@angular/material/legacy-dialog";
import { ConfirmDialogComponent } from "./confirm-dialog.component";
import { MaterialModule } from "../../shared/material/material.module";
describe("ConfirmDialogComponent", () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
      declarations: [ConfirmDialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
