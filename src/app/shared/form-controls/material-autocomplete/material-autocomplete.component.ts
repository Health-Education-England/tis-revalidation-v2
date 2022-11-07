import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  switchMap,
  tap
} from "rxjs/operators";
import { AutocompleteControl } from "../form-contol-base.model";
import { AutocompleteService } from "./autocomplete.service";

@Component({
  selector: "app-material-autocomplete",
  templateUrl: "./material-autocomplete.component.html",
  styleUrls: ["./material-autocomplete.component.scss"]
})
export class MaterialAutocompleteComponent implements OnInit {
  @Input() controlProperties!: AutocompleteControl;
  @Input() form!: FormGroup;
  debounceTime: number = 500;
  minLengthTerm: number = 3;
  filteredItems: any;
  isLoading: boolean;
  isNoMatches: boolean;

  options: any[];

  constructor(private autocompleteService: AutocompleteService) {}

  onSelected() {
    this.form.controls[this.controlProperties.key].updateValueAndValidity();
    this.form.markAsDirty();
  }

  clearSelection() {
    this.form.controls[this.controlProperties.key].setValue("");
    this.filteredItems = [];
  }

  ngOnInit() {
    this.minLengthTerm =
      this.controlProperties.minLengthTerm || this.minLengthTerm;
    this.controlProperties &&
      this.form.controls[this.controlProperties.key].valueChanges
        .pipe(
          filter((inputValue) => {
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
          tap(() => {
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
            this.isNoMatches = false;
          } else {
            this.isNoMatches = true;
            this.filteredItems = [];
          }
        });
  }
}
