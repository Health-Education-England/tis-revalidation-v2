import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ExceptionsLogService } from "./services/exceptions-log.service";
import { ExceptionsLogComponent } from "./exceptions-log.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { MaterialModule } from "src/app/shared/material/material.module";
import { NgxsModule } from "@ngxs/store";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { mockExceptions } from "./mock-data/exceptions-log-spec-data";

describe("ExceptionsLogComponent", () => {
  let component: ExceptionsLogComponent;
  let fixture: ComponentFixture<ExceptionsLogComponent>;
  let service: jasmine.SpyObj<ExceptionsLogService>;
  const expectedColumnNames = ["GMC Number", "Error message", "Date/time"];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        NgxsModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: ExceptionsLogService,
          useValue: { getExceptions: () => of(mockExceptions) }
        }
      ],
      declarations: [ExceptionsLogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionsLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get data when init", () => {
    component.exceptionsLogData$.subscribe((exceptions) => {
      expect(exceptions).toEqual(mockExceptions);
    });
  });

  it("Display correct columns names", () => {
    const tableHeaders = fixture.debugElement.queryAll(By.css("th"));
    expect(tableHeaders.length).toEqual(expectedColumnNames.length);
    tableHeaders.forEach((tableHeader) => {
      expect(expectedColumnNames).toContain(
        tableHeader.nativeElement.innerText
      );
    });
  });

  it("Should display message when no exceptions found.", () => {
    component.exceptionsLogData$ = of([]);
    fixture.detectChanges();
    const header = fixture.debugElement.nativeElement.querySelector(
      "[data-test='NoExceptionsMessage']"
    );
    expect(header).toBeTruthy;
  });

  it("should select correct GMC id when clicking on a row", () => {
    const navigateSpy = spyOn(component, "navigateToDetails");
    const pointerEvent: PointerEvent = new PointerEvent("PointerEvent");

    const dataRow = fixture.debugElement.nativeElement.querySelector(
      "tbody tr:first-child"
    );
    dataRow.click();
    expect(navigateSpy).toHaveBeenCalledWith(pointerEvent, mockExceptions[0]);
  });
});
