import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {

  transform(value: number, ...args: string[]): string {
    let date=new Date(value);
    let dateString=date.toISOString().replace('Z', '').replace('T', ' ').split('.')[0];
    return dateString;
  }

}
