import { Component, OnInit } from "@angular/core";
import { environment } from "@environment";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { UploadService } from "../services/upload/upload.service";
import { GetFiles } from "../state/concern.actions";
import { ConcernState } from "../state/concern.state";

@Component({
  selector: "app-uploaded-files-list",
  templateUrl: "./uploaded-files-list.component.html",
  styleUrls: ["./uploaded-files-list.component.scss"]
})
export class UploadedFilesListComponent implements OnInit {
  public dateFormat = environment.dateFormat;
  public gmcNumber: number = this.store.selectSnapshot(ConcernState.gmcNumber);
  @Select(ConcernState.getFilesInProgress)
  public getFilesInProgress$: Observable<boolean>;
  @Select(ConcernState.uploadedFiles) public uploadedFiles$: Observable<any[]>;

  constructor(private uploadService: UploadService, private store: Store) {}

  ngOnInit(): void {
    this.getFiles();
  }

  public downloadFile(event: Event): void {
    event.preventDefault();
    (window as any).alert("Your download should resume by next sprint 😀");
  }

  public getFiles(): Observable<any> {
    return this.store.dispatch(new GetFiles(this.gmcNumber));
  }
}
