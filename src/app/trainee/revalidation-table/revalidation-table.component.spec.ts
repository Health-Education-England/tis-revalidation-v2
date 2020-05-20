import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevalidationTableComponent } from './revalidation-table.component';

describe('RevalidationTableComponent', () => {
  let component: RevalidationTableComponent;
  let fixture: ComponentFixture<RevalidationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevalidationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevalidationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
