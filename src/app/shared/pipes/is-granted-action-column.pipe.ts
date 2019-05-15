import { Pipe, PipeTransform } from '@angular/core';
import { AppSessionService } from '@addapptable/components/addapptables-boilerplate/services/app-session.service';

@Pipe({
  name: 'isGrantedActionColumn'
})
export class IsGrantedActionColumnPipe implements PipeTransform {

  constructor(private _sessionService: AppSessionService) { }

  transform(value: string[], args: string[]): string[] {
    const user = this._sessionService.user;
    if (!user) { return value; }
    const existPermission = user.permissions.find(x => args.find(y => y === x) !== undefined) !== undefined;
    if (!existPermission) {
      return value.filter(x => x !== 'actions');
    }
    return value;
  }

}
