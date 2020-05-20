import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-revalidation-confirmation",
  templateUrl: "./revalidation-confirmation.component.html",
  styleUrls: ["./revalidation-confirmation.component.scss"]
})
export class RevalidationConfirmationComponent implements OnInit {
  confirmationForm: FormGroup;
  @Output() notify: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor() {}

  ngOnInit(): void {
    this.confirmationForm = new FormGroup({
      confirm: new FormControl(false, Validators.requiredTrue)
    });
    this.notify.emit(this.confirmationForm);
  }
}
