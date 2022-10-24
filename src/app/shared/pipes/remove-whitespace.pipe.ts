import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "removeWhitespace"
})
export class RemoveWhitespacePipe implements PipeTransform {
  transform(value: string, ...args: any): string {
    return value.replace(/ /g, "");
  }
}
