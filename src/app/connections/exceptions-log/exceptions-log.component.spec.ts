import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionsLogComponent } from './exceptions-log.component';

describe('ExceptionsLogComponent', () => {
  let component: ExceptionsLogComponent;
  let fixture: ComponentFixture<ExceptionsLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExceptionsLogComponent]
    });
    fixture = TestBed.createComponent(ExceptionsLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
