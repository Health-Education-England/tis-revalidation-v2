import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControllerComponent } from './form-controller.component';

describe('FormControllerComponent', () => {
  let component: FormControllerComponent;
  let fixture: ComponentFixture<FormControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
