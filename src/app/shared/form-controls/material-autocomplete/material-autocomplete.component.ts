import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import {
  debounceTime,
  filter,
  finalize,
  isEmpty,
  switchMap,
  tap
} from "rxjs/operators";
import { MaterialAutocompleteControl } from "../contol-base.model";
import { AutocompleteService } from "./autocomplete.service";

@Component({
  selector: "app-material-autocomplete",
  templateUrl: "./material-autocomplete.component.html",
  styleUrls: ["./material-autocomplete.component.scss"]
})
export class MaterialAutocompleteComponent implements OnInit {
  @Input() meta!: MaterialAutocompleteControl;
  @Input() form!: FormGroup;
  @Input() debounceTime: number = 800;
  @Input() minLengthTerm: number = 3;
  @Input() reset: Observable<void>;

  searchControl: FormControl = new FormControl();
  controlName: string;
  filteredItems: any;
  isLoading = false;
  errorMsg!: string;

  options: any[];

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
    } else {
      this.searchControl.enable();
    }
  }

  constructor(private autocompleteService: AutocompleteService) {}

  removeTag(tag: string): void {
    const index = this.form.controls[this.meta.key].value.indexOf(tag);

    if (index >= 0) {
      this.form.controls[this.meta.key].value.splice(index, 1);
      this.form.controls[this.meta.key].updateValueAndValidity();
    }
  }

  onSelected() {
    if (this.meta.allowMultipleSelections) {
      this.form.controls[this.meta.key].setValue([
        ...this.form.controls[this.meta.key].value,
        this.searchControl.value
      ]);
      this.clearSelection();
    } else {
      this.form.controls[this.meta.key].setValue([
        this.searchControl.value["title"]
      ]);
    }

    this.form.controls[this.meta.key].updateValueAndValidity();
  }

  displayWith(value: any) {
    return value?.title;
  }

  clearSelection() {
    this.searchControl.setValue(null);
    //this.form.controls[this.meta.key].setValue(null);
    this.filteredItems = [];
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        filter((val) => {
          if (this.searchControl.dirty) {
            return val;
          }
        })
      )
      .subscribe((val) => {
        if (!val[this.meta.key]) {
          this.searchControl.setValue("");
        }
      });

    this.searchControl.valueChanges
      .pipe(
        filter((res) => {
          if (res !== null && res.length >= this.minLengthTerm) {
            return res;
          }
          this.filteredItems = [];
        }),
        //distinctUntilChanged(),
        debounceTime(this.debounceTime),
        tap((value: string) => {
          this.errorMsg = "";
          this.filteredItems = [];
          this.isLoading = true;
        }),
        switchMap((value: string) =>
          this.autocompleteService.getData(value, this.meta.serviceMethod).pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
        )
      )
      .subscribe((data: any) => {
        if (data == undefined) {
          this.errorMsg = "Error";
          this.filteredItems = [];
        } else {
          this.errorMsg = "";
          this.filteredItems = data;
        }
      });
  }
}
