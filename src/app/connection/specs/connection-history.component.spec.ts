import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ConnectionHistoryComponent } from "../connection-history/connection-history.component";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";

describe("ConnectionHistoryComponent", () => {
  let component: ConnectionHistoryComponent;
  let fixture: ComponentFixture<ConnectionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectionHistoryComponent],
      imports: [MatTableModule, MatCardModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
