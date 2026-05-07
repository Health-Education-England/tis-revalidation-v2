import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConnectionHiddenDiscrepanciesComponent } from "../connection-hidden-discrepancies/connection-hidden-discrepancies.component";
import {
  mockConnectionResponse,
  mockHiddenDiscrepanciesColumnsToDisplay
} from "./mock-data/connection-details-spec-data";
import { By } from "@angular/platform-browser";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { Pipe, PipeTransform } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Pipe({ name: "formatDesignatedBody" })
class MockFormatDesignatedBodyPipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe("ConnectionHiddenDiscrepanciesComponent", () => {
  let component: ConnectionHiddenDiscrepanciesComponent;
  let fixture: ComponentFixture<ConnectionHiddenDiscrepanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ConnectionHiddenDiscrepanciesComponent,
        MockFormatDesignatedBodyPipe
      ],
      imports: [MatTableModule, MatCardModule, MatButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectionHiddenDiscrepanciesComponent);
    component = fixture.componentInstance;
    component.hiddenDiscrepancies = mockConnectionResponse.hiddenDiscrepancies;
    component.hiddenDiscrepanciesColumnsToDisplay =
      mockHiddenDiscrepanciesColumnsToDisplay;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit correct value when 'Show' button is clicked.", () => {
    const eventEmitterSpy = spyOn(component.showDiscrepancy, "emit");

    fixture.debugElement
      .query(By.css("[data-testid='button-show-discrepancy']"))
      .nativeElement.click();
    fixture.detectChanges();
    expect(eventEmitterSpy).toHaveBeenCalledWith({
      discrepancyId: "69cb99444dadd14f27a0d092",
      hiddenForDesignatedBodyCode: "1-RSSQ05"
    });
  });
});
