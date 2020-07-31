import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Select, Store } from "@ngxs/store";
import { UserType } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { Observable } from "rxjs";
import { distinctUntilChanged, map, startWith, take } from "rxjs/operators";
import { AddToAllocateList } from "../state/admins.actions";
import { AdminsState } from "../state/admins.state";

@Component({
  selector: "app-allocate-admin-autocomplete",
  templateUrl: "./allocate-admin-autocomplete.component.html"
})
export class AllocateAdminAutocompleteComponent implements OnInit {
  @Input() public gmcNumber: any;
  @Select(AdminsState.items) public items$: Observable<UserType[]>;
  public filteredItems$: Observable<UserType[]>;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.setupForm();
    this.getItems();
  }

  public setupForm(): void {
    this.form = this.formBuilder.group({ autocomplete: null });
  }

  public getItems(): void {
    this.items$
      .pipe(take(1))
      .subscribe((items: UserType[]) => this.filterItems(items));
  }

  public displayWith(item: UserType): string {
    return item ? item.Username : null;
  }

  public filterItems(items: UserType[]) {
    this.filteredItems$ = this.form.get("autocomplete").valueChanges.pipe(
      startWith(""),
      distinctUntilChanged(),
      map((value: any) => (value.Username ? value.Username : value)),
      map((value: string) => this.filter(value, items))
    );
  }

  private filter(value: string, items): any {
    const filterValue = value.toLowerCase();

    return items.filter((i: UserType) =>
      i.Username.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const emailAddress: string = event.option.value.Attributes.filter(
      (item) => item.Name === "email"
    )[0].Value;
    this.store.dispatch(new AddToAllocateList(emailAddress, this.gmcNumber));
  }
}
