import { Component, OnInit, ChangeDetectionStrategy, Input, Injector } from '@angular/core';
import { FormBase } from 'src/app/shared/forms/form-base';
import { TenantDto } from '@redux/tenant/models/tenant-dto.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { selectTenantLoadingAction, selectTenantActionState } from '@redux/tenant/selectors/tenant.selector';
import { TenantActionComplete, UpdateTenant, CreateTenant } from '@redux/tenant/actions/tenant.actions';
import { UtilValidation } from 'src/app/shared/utils/util-validation';
import { maxLengthLargeSize } from '@redux/user/user.const';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantFormComponent extends FormBase implements OnInit {

  maxNameLength = 128;

  maxTenancyNameLength = 64;

  maxEmailAddressLength = maxLengthLargeSize;

  maxConnectionStringLength = 1024;

  formGroup: FormGroup;

  @Input()
  tenantDto: TenantDto;

  constructor(
    injector: Injector
  ) {
    super(injector, selectTenantLoadingAction, selectTenantActionState, new TenantActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    this.formGroup = this._fb.group({
      id: [this.tenantDto.id],
      name: [this.tenantDto.name, [UtilValidation.required, Validators.maxLength(this.maxNameLength)]],
      tenancyName: [
        this.tenantDto.tenancyName,
        [
          UtilValidation.required,
          Validators.pattern('^[a-zA-Z][a-zA-Z0-9_-]{1,}$'),
          Validators.maxLength(this.maxTenancyNameLength)
        ]
      ],
      connectionString: [
        { value: this.tenantDto.connectionString, disabled: this.tenantDto.id !== undefined },
        [Validators.maxLength(this.maxConnectionStringLength)]
      ],
      editionId: [this.tenantDto.editionId],
      isActive: [this.tenantDto.isActive]
    });
    if (!this.tenantDto.id) {
      this.formGroup.addControl('adminEmailAddress',
        new FormControl(null, [UtilValidation.required, Validators.email, Validators.maxLength(this.maxEmailAddressLength)])
      );
    }
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    const tenantDto = this.formGroup.value;
    if (tenantDto.id) {
      this._store.dispatch(new UpdateTenant({ tenant: tenantDto }));
    } else {
      this._store.dispatch(new CreateTenant({ tenant: tenantDto }));
    }
  }

}
