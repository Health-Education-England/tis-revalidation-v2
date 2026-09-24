import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule, Store } from "@ngxs/store";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { UpdateConnetionsBtnComponent } from "./update-connetions-btn.component";
import {
  provideHttpClient,
  withInterceptorsFromDi
} from "@angular/common/http";
import { MaterialModule } from "src/app/shared/material/material.module";
import { UpdateConnectionsState } from "../state/update-connections.state";

describe("UpdateConnetionsBtnComponent", () => {
  let component: UpdateConnetionsBtnComponent;
  let fixture: ComponentFixture<UpdateConnetionsBtnComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateConnetionsBtnComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([UpdateConnectionsState], {
          selectorOptions: { suppressErrors: true }
        }),
        RouterTestingModule
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      updateConnections: {
        enableUpdateConnections: false,
        dbcs: []
      }
    });

    fixture = TestBed.createComponent(UpdateConnetionsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
