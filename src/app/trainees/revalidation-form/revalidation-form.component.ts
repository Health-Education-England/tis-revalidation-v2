import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-revalidation-form",
  templateUrl: "./revalidation-form.component.html",
  styleUrls: ["./revalidation-form.component.scss"]
})
export class RevalidationFormComponent implements OnInit {
  revalidationForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.revalidationForm = new FormGroup({
      action: new FormControl(""),
      date: new FormControl("", Validators.required),
      reason: new FormControl("", Validators.required),
      confirm: new FormControl(false, Validators.requiredTrue),
      comments: new FormControl("")
    });
  }
}
