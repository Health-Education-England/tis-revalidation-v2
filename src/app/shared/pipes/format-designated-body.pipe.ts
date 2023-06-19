import { Pipe, PipeTransform } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";
import { Store } from "@ngxs/store";
import { IDesignatedBody } from "src/app/reference/reference.interfaces";
import { ReferenceState } from "src/app/reference/state/reference.state";

export type dbcFormat = "dbc" | "abbr" | "name";
@Pipe({
  name: "formatDesignatedBody"
})
export class FormatDesignatedBodyPipe implements PipeTransform {
  constructor(private store: Store) {}

  private dbcs: IDesignatedBody[] =
    this.store.selectSnapshot(ReferenceState)?.dbcs;

  transform(value: string, format: dbcFormat = "dbc"): SafeHtml {
    if (value && this.dbcs) {
      const matches: IDesignatedBody[] = this.dbcs.filter(
        (designatedBody: IDesignatedBody) =>
          Object.values(designatedBody).includes(value)
      );
      if (matches.length === 1) {
        return matches[0][format];
      }
    }
    return value;
  }
}
