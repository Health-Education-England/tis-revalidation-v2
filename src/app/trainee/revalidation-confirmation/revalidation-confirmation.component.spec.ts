import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevalidationConfirmationComponent } from './revalidation-confirmation.component';

describe('RevalidationConfirmationComponent', () => {
  let component: RevalidationConfirmationComponent;
  let fixture: ComponentFixture<RevalidationConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevalidationConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevalidationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
