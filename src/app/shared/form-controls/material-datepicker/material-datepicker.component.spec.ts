import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDatepickerComponent } from './material-datepicker.component';

describe('MaterialDatepickerComponent', () => {
  let component: MaterialDatepickerComponent;
  let fixture: ComponentFixture<MaterialDatepickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialDatepickerComponent]
    });
    fixture = TestBed.createComponent(MaterialDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
