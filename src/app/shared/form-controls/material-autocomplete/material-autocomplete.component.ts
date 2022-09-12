import { ValueConverter } from "@angular/compiler/src/render3/view/template";
import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { debounceTime, filter, finalize, switchMap, tap } from "rxjs/operators";
import { SnackBarService } from "../../services/snack-bar/snack-bar.service";
import { AutocompleteControl } from "../form-contol-base.model";
import { AutocompleteService } from "./autocomplete.service";

@Component({
  selector: "app-material-autocomplete",
  templateUrl: "./material-autocomplete.component.html",
  styleUrls: ["./material-autocomplete.component.scss"]
})
export class MaterialAutocompleteComponent implements OnInit {
  @Input() meta!: AutocompleteControl;
  @Input() form!: FormGroup;
  debounceTime: number = 800;
  minLengthTerm: number = 3;

  filteredItems: any;
  isLoading: boolean;
  isNoMatches: boolean;

  options: any[];

  constructor(private autocompleteService: AutocompleteService) {}

  onSelected() {
    this.form.controls[this.meta.key].updateValueAndValidity();
    this.form.markAsDirty();
  }

  displayWith(value: any) {
    return value;
  }

  clearSelection() {
    this.form.controls[this.meta.key].setValue("");
    this.filteredItems = [];
  }

  ngOnInit() {
    this.meta &&
      this.form.controls[this.meta.key].valueChanges
        .pipe(
          filter((inputValue) => {
            if (
              inputValue !== null &&
              inputValue.length >= this.minLengthTerm
            ) {
              return inputValue;
            }
            // this.filteredItems = [];
          }),
          //distinctUntilChanged(),
          debounceTime(this.debounceTime),
          tap(() => {
            this.filteredItems = [];
            this.isLoading = true;
          }),
          switchMap((inputValue: string) =>
            this.autocompleteService
              .getListItems(this.meta.key, inputValue)
              .pipe(
                finalize(() => {
                  this.isLoading = false;
                })
              )
          )
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
