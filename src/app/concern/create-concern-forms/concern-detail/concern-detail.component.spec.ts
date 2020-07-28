import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcernDetailComponent } from './concern-detail.component';

describe('ConcernDetailComponent', () => {
  let component: ConcernDetailComponent;
  let fixture: ComponentFixture<ConcernDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcernDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcernDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
