import { Pipe, PipeTransform } from "@angular/core";
import { TraineesService } from "./trainees.service";

@Pipe({
  name: "traineeWarnPipe"
})
export class TraineeWarnPipePipe implements PipeTransform {
  constructor(private traineeService: TraineesService) {}
  transform(row: any): boolean {
    const filter = this.traineeService.cssWarnColumn;
    const val: string = row[filter.columnName];
    const cmp: string = filter.columnValue;
    return val.toLowerCase() === cmp.toLowerCase();
  }
}
