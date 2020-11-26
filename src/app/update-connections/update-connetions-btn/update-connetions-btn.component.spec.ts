import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxsModule } from "@ngxs/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { UpdateConnetionsBtnComponent } from "./update-connetions-btn.component";

describe("UpdateConnetionsBtnComponent", () => {
  let component: UpdateConnetionsBtnComponent;
  let fixture: ComponentFixture<UpdateConnetionsBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
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
