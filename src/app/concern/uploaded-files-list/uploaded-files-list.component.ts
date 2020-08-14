import { Component, OnInit } from "@angular/core";
import { environment } from "@environment";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ACCEPTED_IMAGE_EXTENSIONS } from "../constants";
import { DeleteFile, DownloadFile, ListFiles } from "../state/concern.actions";
import { ConcernState } from "../state/concern.state";
import { IConcernSummary } from "../concern.interfaces";

@Component({
  selector: "app-uploaded-files-list",
  templateUrl: "./uploaded-files-list.component.html",
  styleUrls: ["./uploaded-files-list.component.scss"]
})
export class UploadedFilesListComponent implements OnInit {
  public dateFormat = environment.dateFormat;
  public gmcNumber: number = this.store.selectSnapshot(ConcernState.gmcNumber);
  @Select(ConcernState.listFilesInProgress)
  public listFilesInProgress$: Observable<boolean>;
  @Select(ConcernState.uploadedFiles) public uploadedFiles$: Observable<any[]>;
  @Select(ConcernState.selected)
  selectedConcern$: Observable<IConcernSummary>;
  public acceptedImageExtensions: string[] = ACCEPTED_IMAGE_EXTENSIONS;
  public concernId?: number;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.setConcernId();
  }

  public downloadFile(fileName: string, key: string): Observable<any> {
    return this.store.dispatch(new DownloadFile(fileName, key));
  }

  public setConcernId(): void {
    this.selectedConcern$.subscribe((selectedConcern: IConcernSummary) => {
      this.concernId = selectedConcern.concernId;
      this.listFiles();
    });
  }

  public deleteFile(fileName: string, key: string): Observable<any> {
    return this.store.dispatch(
      new DeleteFile(encodeURIComponent(fileName), key)
    );
  }

  public listFiles(): Observable<any> {
    return this.store.dispatch(new ListFiles(this.gmcNumber, this.concernId));
  }
}
