import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedColumnFiltersComponent } from './selected-column-filters.component';

describe('SelectedColumnFiltersComponent', () => {
  let component: SelectedColumnFiltersComponent;
  let fixture: ComponentFixture<SelectedColumnFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedColumnFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedColumnFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
