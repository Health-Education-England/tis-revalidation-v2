import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import {
  AutocompleteControl,
  FormControlBase,
  FormControlType
} from "../form-controls/form-contol-base.model";
import { FormControllerService } from "./form-controller.service";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { RecordsService } from "src/app/records/services/records.service";

@Component({
  selector: "app-form-controller",
  templateUrl: "./form-controller.component.html"
})
export class FormControllerComponent implements OnInit {
  constructor(
    private formControllService: FormControllerService,
    private store: Store,
    private recordsService: RecordsService
  ) {}
  public tableFilters$: Observable<any> = this.store.select(
    (state) => state[this.recordsService.stateName].tableFilters
  );

  public filter$: Observable<string> = this.store.select(
    (state) => state[this.recordsService.stateName].filter
  );
  formControlType: typeof FormControlType = FormControlType;
  hidden: boolean = false;
  @Input() control!: FormControlBase | AutocompleteControl;
  @Input() form!: UntypedFormGroup;

  ngOnInit(): void {
    this.filter$.subscribe((filter: string) => {
      if (this.control?.filterType && this.control?.filterType !== filter) {
        this.hidden = true;
      } else {
        this.hidden = false;
      }
    });
    if (this.control?.valueProperty) {
      this.control.value = this.formControllService[this.control.valueProperty];
    }
  }
}
