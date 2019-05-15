import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionDto } from '../models/permission-dto.model';
import { ServiceApiBase } from '@redux/services/service-base';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, '/api/services/app/Permission');
  }

  getAll(): Observable<PermissionDto[]> {
    return this.get<PermissionDto[]>('GetAllPermissions');
  }
}
