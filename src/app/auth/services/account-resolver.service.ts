import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AccountResolverService implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot) {
    const userId = route.params['userId'];
    const resetCode = route.params['resetCode'];
    return { userId, resetCode };
  }
}
