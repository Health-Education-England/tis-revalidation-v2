import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHideTableColumnsComponent } from './show-hide-table-columns.component';

describe('ShowHideTableColumnsComponent', () => {
  let component: ShowHideTableColumnsComponent;
  let fixture: ComponentFixture<ShowHideTableColumnsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowHideTableColumnsComponent]
    });
    fixture = TestBed.createComponent(ShowHideTableColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
