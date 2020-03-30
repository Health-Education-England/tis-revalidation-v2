import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevalidationFormComponent } from './revalidation-form.component';

describe('RevalidationFormComponent', () => {
  let component: RevalidationFormComponent;
  let fixture: ComponentFixture<RevalidationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevalidationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevalidationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
