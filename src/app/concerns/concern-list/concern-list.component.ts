import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { Get } from "../state/concerns.actions";

@Component({
  selector: "app-concern-list",
  templateUrl: "./concern-list.component.html"
})
export class ConcernListComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    // TODO this action is just here to get the WIP concerns initial code in
    // clean up and extending of common code to follow in next pr
    this.store.dispatch(new Get());
  }
}
