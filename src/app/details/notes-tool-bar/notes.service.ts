import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
/**
 * Add delete comment formControls from tool-bar UI
 */
export class NotesService {
  showNotes$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}
}
