import { Pipe, PipeTransform, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Pipe({
  name: "stripHtml",
  pure: true
})
export class StripHtmlPipe implements PipeTransform {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  transform(htmlString: string, ...args: any[]): string {
    return (
      this.document
        .createRange()
        // Creates a fragment and turns the supplied string into HTML nodes
        .createContextualFragment(htmlString)
        // Gets the text from the fragment
        .textContent // Removes the Zero-Width Space, Zero-Width Joiner, Zero-Width No-Break Space, Left-To-Right Mark, and Right-To-Left Mark characters
        .replace(/[\u200B-\u200D\uFEFF\u200E\u200F]/g, "")
        // Trims off any extra space on either end of the string
        .trim()
    );
  }
}
