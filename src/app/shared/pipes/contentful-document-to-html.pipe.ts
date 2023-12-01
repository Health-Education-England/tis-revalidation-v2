import { Pipe, PipeTransform } from "@angular/core";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
@Pipe({
  name: "contentfulDocumentToHtml"
})
export class ContentfulDocumentToHtmlPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): string {
    console.log("VALUE:", value);
    if (value) {
      return documentToHtmlString(value);
    }
    return null;
  }
}
