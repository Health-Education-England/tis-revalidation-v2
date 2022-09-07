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

  searchControl: FormControl = new FormControl();
  filteredItems: any;
  isLoading: boolean;
  isNoMatches: boolean;

  options: any[];

  constructor(
    private autocompleteService: AutocompleteService,
    private snackBarService: SnackBarService
  ) {}

  onSelected() {
    this.form.controls[this.meta.key].updateValueAndValidity();
    this.form.markAsDirty();
  }

  displayWith(value: any) {
    return value;
  }

  clearSelection() {
    this.filteredItems = [];
  }

  ngOnInit() {
    this.form.controls[this.meta.key].valueChanges
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
          this.isNoMatches = true;
          this.filteredItems = [];
        } else {
          this.filteredItems = data;
          this.isNoMatches = false;
        }
      });
  }
}
