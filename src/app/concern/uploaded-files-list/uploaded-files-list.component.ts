import { Component, OnInit } from "@angular/core";
import { environment } from "@environment";

@Component({
  selector: "app-uploaded-files-list",
  templateUrl: "./uploaded-files-list.component.html",
  styleUrls: ["./uploaded-files-list.component.scss"]
})
export class UploadedFilesListComponent implements OnInit {
  // TODO type the array and select from store
  public uploadedFiles: Array<any> = [
    {
      name: "Photos",
      updated: new Date("1/1/20"),
      type: "image"
    },
    {
      name: "Document",
      updated: new Date("1/17/19"),
      type: "doc"
    },
    {
      name: "Portable document format",
      updated: new Date("1/28/18"),
      type: "pdf"
    }
  ];
  public dateFormat = environment.dateFormat;
  constructor() {}

  ngOnInit(): void {}

  public downloadFile(event: Event): void {
    event.preventDefault();
    (window as any).alert("Your download should resume by next sprint 😀");
  }
}
