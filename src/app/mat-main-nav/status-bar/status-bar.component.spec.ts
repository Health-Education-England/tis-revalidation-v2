import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { StatusBarComponent } from "./status-bar.component";
import { MatMenuModule } from "@angular/material/menu";

describe("StatusBarComponent", () => {
  let component: StatusBarComponent;
  let fixture: ComponentFixture<StatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusBarComponent],
      imports: [MatMenuModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
