import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AppSessionService } from '@addapptable/components/addapptables-boilerplate/services/app-session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  constructor(private _router: Router,
    private _appSessionService: AppSessionService) { }

  closeSession() {
    this._appSessionService.logout();
    this._router.navigate(['/']);
  }

  viewProfile() {
    this._router.navigate(['/admin/profile']);
  }

}
