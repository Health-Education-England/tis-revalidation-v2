import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UpdateConnetionsBtnComponent } from "./update-connetions-btn.component";

describe("UpdateConnetionsBtnComponent", () => {
  let component: UpdateConnetionsBtnComponent;
  let fixture: ComponentFixture<UpdateConnetionsBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateConnetionsBtnComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConnetionsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
