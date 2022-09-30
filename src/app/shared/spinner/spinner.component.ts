import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "./spinner.service";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"]
})
export class SpinnerComponent implements OnInit {
  showSpinner: boolean = false;
  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.spinner$.subscribe((status: boolean) => {
      this.showSpinner = status ? status : false;
      console.log("SPINNER: ", this.showSpinner);
    });
  }
}
