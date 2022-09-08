import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RecordListTableFiltersComponent } from "./record-list-table-filters.component";

xdescribe("RecordListTableFiltersComponent", () => {
  let component: RecordListTableFiltersComponent;
  let fixture: ComponentFixture<RecordListTableFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordListTableFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordListTableFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
