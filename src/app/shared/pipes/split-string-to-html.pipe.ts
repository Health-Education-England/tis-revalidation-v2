import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
@Pipe({
  name: "splitStringToHTML"
})
export class SplitStringToHTMLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string, delimiter: string = "|"): SafeHtml {
    if (value && value.includes(delimiter)) {
      return this.sanitizer.bypassSecurityTrustHtml(
        value
          .split(delimiter)
          .map((item: string) => `<span class='split-item'>${item}</span>`)
          .join(" ")
      );
    }
    return value;
  }
}
