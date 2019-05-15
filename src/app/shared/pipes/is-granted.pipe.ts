import { Pipe, PipeTransform } from '@angular/core';
import { AppSessionService } from '@addapptable/components/addapptables-boilerplate/services/app-session.service';

@Pipe({
  name: 'isGranted'
})
export class IsGrantedPipe implements PipeTransform {

  constructor(private _sessionService: AppSessionService) { }

  transform(permission: string): boolean {
    const user = this._sessionService.user;
    if (!user) { return false; }
    return user.permissions.find(x => x === permission) !== undefined;
  }

}
