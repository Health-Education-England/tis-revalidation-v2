import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { RecommendationsState } from "../../recommendations/state/recommendations.state";

import { AllocateAdminActionsComponent } from "./allocate-admin-actions.component";
import { RecordsService } from "src/app/records/services/records.service";
import { of } from "rxjs";
import { ClearAllocateList } from "../state/admins.actions";

describe("AllocateAdminActionsComponent", () => {
  let component: AllocateAdminActionsComponent;
  let fixture: ComponentFixture<AllocateAdminActionsComponent>;
  let store: Store;
  let recordsService: RecordsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllocateAdminActionsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxsModule.forRoot([RecommendationsState])
      ],
      providers: [RecordsService]
    }).compileComponents();

    store = TestBed.inject(Store);
    recordsService = TestBed.inject(RecordsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateAdminActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(recordsService, "enableAllocateAdmin").and.callFake(
      (val: boolean) => {
        return of(val);
      }
    );

    spyOn(recordsService, "get").and.stub();

    spyOn(store, "dispatch").and.callThrough();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("on cancel() should call enableAllocateAdmin with false", () => {
    component.cancel();
    expect(recordsService.enableAllocateAdmin).toHaveBeenCalled();
    expect(recordsService.enableAllocateAdmin).toHaveBeenCalledWith(false);
  });

  it("on cancel() should call store.dispath with new ClearAllocateList", () => {
    component.cancel();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(new ClearAllocateList());
  });

  it("on save() should call enableAllocateAdmin with false", () => {
    component.save();
    expect(recordsService.enableAllocateAdmin).toHaveBeenCalled();
    expect(recordsService.enableAllocateAdmin).toHaveBeenCalledWith(false);
  });

  it("on save() should call store.dispatch and recordsService.get", () => {
    component.save();
    expect(store.dispatch).toHaveBeenCalled();
    expect(recordsService.get).toHaveBeenCalled();
  });

  describe("Template testing", () => {
    let template: any;
    let buttons: NodeList;
    let cancelButton: HTMLButtonElement;
    let saveButton: HTMLButtonElement;

    beforeEach(() => {
      component.enableAllocateAdmin$ = of(true);

      spyOn(component, "cancel").and.stub();
      spyOn(component, "save").and.stub();

      fixture.detectChanges();

      template = fixture.debugElement.nativeElement;
      buttons = template.querySelectorAll("button");
      buttons.forEach((button: Node) => {
        if (button.textContent.includes("Cancel")) {
          cancelButton = button as HTMLButtonElement;
        } else if (button.textContent.includes("Save")) {
          saveButton = button as HTMLButtonElement;
        }
      });
    });

    it("Click Cancel button should call cancel", () => {
      cancelButton.click();
      expect(component.cancel).toHaveBeenCalled();
    });

    it("Click Save button should call save", () => {
      saveButton.click();
      expect(component.save).toHaveBeenCalled();
    });
  });
});
