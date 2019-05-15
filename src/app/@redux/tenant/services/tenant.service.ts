import { Injectable, Injector } from '@angular/core';
import { ServiceApiBase } from '@redux/services/service-base';
import { GetTenantDto } from '../models/get-tenant-dto.model';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { TenantDto } from '../models/tenant-dto.model';
import { CreateTenantDto } from '../models/create-tenant-dto.model';
import { UpdateTenantDto } from '../models/update-tenant-dto.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/services/app/Tenant');
  }

  getAll(input: GetTenantDto) {
    return this.get<GetTenantDto, PaginatedModel<TenantDto>>('GetAll', input);
  }

  create(input: CreateTenantDto) {
    return this.post<CreateTenantDto, TenantDto>('Create', input);
  }

  update(input: UpdateTenantDto) {
    return this.put<UpdateTenantDto, TenantDto>('Update', input);
  }

  deleteTenant(id: number) {
    return this.delete('Delete', id);
  }
}
