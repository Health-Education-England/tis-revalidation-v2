import { Component, OnInit, Input, HostListener } from "@angular/core";
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  switchMap,
  tap
} from "rxjs/operators";
import {
  AutocompleteControl,
  OnChangeFn,
  OnTouchFn
} from "../form-contol-base.model";
import { AutocompleteService } from "./autocomplete.service";

@Component({
  selector: "app-material-autocomplete",
  templateUrl: "./material-autocomplete.component.html",
  styleUrls: ["./material-autocomplete.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MaterialAutocompleteComponent
    }
  ]
})
export class MaterialAutocompleteComponent
  implements OnInit, ControlValueAccessor
{
  @Input() controlProperties!: AutocompleteControl;

  disabled = false;
  autocompleteForm: FormGroup;
  debounceTime: number = 500;
  minLengthTerm: number = 3;
  filteredItems: any;
  showClearButton = false;
  isLoading: boolean;
  options: any[];

  constructor(
    readonly autocompleteService: AutocompleteService,
    readonly formBuilder: FormBuilder
  ) {}

  onSelected() {
    this.onChange(this.autocompleteForm.get("autocompleteInput").value);
  }

  clearSelection() {
    this.autocompleteForm.get("autocompleteInput").setValue("");
    this.filteredItems = [];
  }

  ngOnInit() {
    this.autocompleteForm = this.formBuilder.group({
      autocompleteInput: ""
    });

    this.controlProperties &&
      this.autocompleteForm
        .get("autocompleteInput")
        .valueChanges.pipe(
          filter((inputValue) => {
            this.showClearButton = inputValue?.length > 0;
            if (
              inputValue !== null &&
              inputValue.length >= this.minLengthTerm
            ) {
              return inputValue;
            } else {
              this.filteredItems = [];
            }
          }),
          distinctUntilChanged(),
          debounceTime(this.debounceTime),
          tap((v) => {
            this.filteredItems = [];
            this.isLoading = true;
          }),
          switchMap((inputValue: string) => {
            if (this.controlProperties.data?.length) {
              return this.autocompleteService
                .filterItems(inputValue, this.controlProperties.data)
                .pipe(
                  finalize(() => {
                    this.isLoading = false;
                  })
                );
            }
            return this.autocompleteService
              .getItems(this.controlProperties.key, inputValue)
              .pipe(
                tap((items) => items.unshift(inputValue)),
                finalize(() => {
                  this.isLoading = false;
                })
              );
          })
        )
        .subscribe((data: any) => {
          if (data?.length) {
            this.filteredItems = data;
          } else {
            this.filteredItems = [];
          }
        });
  }

  // ControlValueAccessor
  onChange: OnChangeFn<string> = () => {};
  onTouch: OnTouchFn = () => {};

  writeValue(value: string): void {
    this.autocompleteForm.get("autocompleteInput").setValue(value);
  }
  registerOnChange(fn: OnChangeFn<string>): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: OnTouchFn): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener("focusout")
  onFocusOut() {
    this.onTouch();
  }
}
