import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { Get } from "./admins/state/admins.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Get("reval-site-admin"));
  }
}
