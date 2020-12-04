import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ClearAllocateList } from "../state/admins.actions";
import { RecordsService } from "../../records/services/records.service";
import { AdminsService } from "../services/admins.service";
import { SnackBarService } from "src/app/shared/services/snack-bar/snack-bar.service";
import { IAllocateAdmin } from "../admins.interfaces";

@Component({
  selector: "app-allocate-admin-actions",
  templateUrl: "./allocate-admin-actions.component.html",
  styleUrls: ["./allocate-admin-actions.component.scss"]
})
export class AllocateAdminActionsComponent {
  public enableAllocateAdmin$: Observable<boolean> = this.store.select(
    (state) => state[this.recordsService.stateName].enableAllocateAdmin
  );

  public items$: Observable<any[]> = this.store.select(
    (state) => state[this.recordsService.stateName].items
  );

  public admin = "";
  public selectedItems = [];
  public canSave = false;

  constructor(
    private store: Store,
    private recordsService: RecordsService,
    private adminsService: AdminsService,
    private snackBarService: SnackBarService
  ) {
    this.adminsService.selectedAdmin$.subscribe(
      (admin) => (this.admin = admin)
    );
    this.items$.subscribe((items) => {
      if (items) {
        this.selectedItems = items.filter((item) => item.checked);
        this.canSave = this.selectedItems.length > 0;
      }
    });
  }

  public cancel(): void {
    this.recordsService.enableAllocateAdmin(false);
    this.store.dispatch(new ClearAllocateList());
    this.adminsService.selectedAdmin$.next(null);
  }

  public reset(): void {
    this.adminsService.resetForm$.next();
    this.adminsService.selectedAdmin$.next(null);
  }

  public save(): void {
    if (this.selectedItems.length > 0 && this.admin) {
      const payload: IAllocateAdmin[] = this.selectedItems.map<IAllocateAdmin>(
        (item) => ({
          admin: this.admin,
          gmcNumber: Number(item.gmcReferenceNumber)
        })
      );

      this.adminsService.submitAllocateList(payload).subscribe(
        () => {
          this.snackBarService.openSnackBar("Successfully assigned admins");
          this.recordsService.enableAllocateAdmin(false);
          this.adminsService.selectedAdmin$.next(null);
          this.recordsService.get();
        },
        () => {
          this.snackBarService.openSnackBar("Failed to assign admins");
        }
      );
    } else {
      this.snackBarService.openSnackBar(
        "Please select doctors and admin to allocate"
      );
    }
  }
}
