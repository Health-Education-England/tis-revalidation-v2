import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Select } from "@ngxs/store";
import { UserType } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { Observable } from "rxjs";
import { distinctUntilChanged, map, startWith, take } from "rxjs/operators";
import { AdminsState } from "../../admins/state/admins.state";

@Component({
  selector: "app-allocate-admin-autocomplete",
  templateUrl: "./allocate-admin-autocomplete.component.html"
})
export class AllocateAdminAutocompleteComponent implements OnInit {
  @Select(AdminsState.items) public items$: Observable<UserType[]>;
  public filteredItems$: Observable<UserType[]>;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
}
