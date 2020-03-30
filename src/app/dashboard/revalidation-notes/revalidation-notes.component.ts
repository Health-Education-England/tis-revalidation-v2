import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";

@Component({
  selector: "app-revalidation-notes",
  templateUrl: "./revalidation-notes.component.html",
  styleUrls: ["./revalidation-notes.component.scss"]
})
export class RevalidationNotesComponent implements OnInit {
  messages: string[]; // mock
  addEditNote: boolean;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<RevalidationNotesComponent>
  ) {}

  ngOnInit(): void {
    this.messages = [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
      `Pellentesque facilisis erat non mollis varius.`,
      `Donec laoreet sapien a eros commodo ultricies.`,
      `Maecenas ac dui dignissim, faucibus lectus sit amet, feugiat neque. et massa quis urna elementum interdum in ac neque. Vestibulum ut justo mattis, eleifend neque et, vulputate neque. Duis ornare leo at posuere feugiat.`
    ];

    this.addEditNote = false;
  }

  addNote(): void {
    this.addEditNote = true;
  }

  cancelNote(): void {
    this.addEditNote = false;
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
