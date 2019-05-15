import { Injectable } from '@angular/core';

import {
    Router,
    CanActivate
} from '@angular/router';
import { AppSessionService } from '@addapptable/components/addapptables-boilerplate/services/app-session.service';

@Injectable()
export class LoginRouteGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _sessionService: AppSessionService,
    ) { }

    canActivate(): boolean {
        if (this._sessionService.user) {
            this._router.navigate(['/admin']);
            return false;
        }
        return true;
    }
}
