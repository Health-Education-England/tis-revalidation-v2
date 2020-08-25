import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  take
} from "rxjs/operators";
import { IAdmin } from "../admins.interfaces";
import { AddToAllocateList } from "../state/admins.actions";
import { AdminsState } from "../state/admins.state";

@Component({
  selector: "app-allocate-admin-autocomplete",
  templateUrl: "./allocate-admin-autocomplete.component.html"
})
export class AllocateAdminAutocompleteComponent implements OnInit {
  @Input() public gmcNumber: number;
  @Input() public admin?: string;
  @Select(AdminsState.items) public items$: Observable<IAdmin[]>;
  public filteredItems$: Observable<IAdmin[]>;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.setupForm();
    this.getItems();
  }

  public setupForm(): void {
    this.form = this.formBuilder.group({
      autocomplete: this.prePopulateAdmin()
    });
  }

  public prePopulateAdmin(): IAdmin {
    const admins: IAdmin[] = this.store.selectSnapshot(AdminsState).items;
    if (admins?.length) {
      return admins.find((item: IAdmin) => item.fullName === this.admin);
    }
  }

  public getItems(): void {
    this.items$
      .pipe(filter(Boolean), take(1))
      .subscribe((items: IAdmin[]) => this.filterItems(items));
  }

  public displayWith(item: IAdmin): string {
    return item ? item.fullName : null;
  }

  public filterItems(items: IAdmin[]) {
    this.filteredItems$ = this.form.get("autocomplete").valueChanges.pipe(
      startWith(""),
      distinctUntilChanged(),
      map((value: any) => (value.fullName ? value.fullName : value)),
      map((value: string) => this.filter(value, items))
    );
  }

  private filter(value: string, items: IAdmin[]): any {
    if (items && items.filter) {
      return items.filter((i: IAdmin) =>
        i.fullName.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const admin: string = event.option.value.fullName;
    this.store.dispatch(new AddToAllocateList(admin, this.gmcNumber));
  }
}
