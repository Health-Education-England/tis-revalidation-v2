import { Pipe, PipeTransform, Inject, DOCUMENT } from "@angular/core";


@Pipe({
    name: "stripHtml",
    standalone: false
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
