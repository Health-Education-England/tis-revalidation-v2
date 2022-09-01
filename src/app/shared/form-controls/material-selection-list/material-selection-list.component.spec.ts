import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSelectionListComponent } from './material-selection-list.component';

describe('MaterialSelectionListComponent', () => {
  let component: MaterialSelectionListComponent;
  let fixture: ComponentFixture<MaterialSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSelectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
