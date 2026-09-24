import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { ConcernState } from "../../state/concern.state";

import { UploadDocumentsComponent } from "./upload-documents.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { CommentsService } from "src/app/details/comments/comments.service";
import { DetailsModule } from "src/app/details/details.module";
import { SetSelectedConcern } from "../../state/concern.actions";
import { defaultConcern } from "../../constants";
import { SnackBarService } from "src/app/shared/services/snack-bar/snack-bar.service";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("UploadDocumentsComponent", () => {
  let component: UploadDocumentsComponent;
  let fixture: ComponentFixture<UploadDocumentsComponent>;
  let commentsService: CommentsService;
  let store: Store;
  let snackBarService: SnackBarService;
  let activatedRoute: ActivatedRoute;

  const setDefaultSelectedConcern = () => {
    store.dispatch(
      new SetSelectedConcern({
        ...defaultConcern,
        ...{ concernId: "xxx-111-yyy", gmcNumber: 8119389 }
      })
    );
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [UploadDocumentsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
        DetailsModule,
        NgxsModule.forRoot([ConcernState])],
    providers: [
        CommentsService,
        {
            provide: ActivatedRoute,
            useValue: {
                snapshot: {
                    params: {
                        concernId: "xxx-111-yyy"
                    }
                }
            }
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
}).compileComponents();
    store = TestBed.inject(Store);
    snackBarService = TestBed.inject(SnackBarService);
    commentsService = TestBed.inject(CommentsService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    setDefaultSelectedConcern();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
