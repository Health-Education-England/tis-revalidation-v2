import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordListColumnsComponent } from './record-list-columns.component';

describe('RecordListColumnsComponent', () => {
  let component: RecordListColumnsComponent;
  let fixture: ComponentFixture<RecordListColumnsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordListColumnsComponent]
    });
    fixture = TestBed.createComponent(RecordListColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
