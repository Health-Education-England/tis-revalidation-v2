import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDateRangePickerComponent } from './material-date-range-picker.component';

describe('MaterialDateRangePickerComponent', () => {
  let component: MaterialDateRangePickerComponent;
  let fixture: ComponentFixture<MaterialDateRangePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialDateRangePickerComponent]
    });
    fixture = TestBed.createComponent(MaterialDateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
