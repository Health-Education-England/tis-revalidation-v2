import { Pipe, PipeTransform, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Pipe({
  name: "stripHtml"
})
export class StripHtmlPipe implements PipeTransform {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  transform(htmlString: string, ...args: any[]): string {
    return this.document
      .createRange()
      .createContextualFragment(htmlString)
      .textContent.replace(/[\u200B-\u200D\uFEFF\u200E\u200F]/g, "")
      .trim();
  }
}
