import { IApplicationInfoDto } from './application.model';
import { UserLoginInfoDto } from './user-login.model';
import { ITenantLoginInfoDto } from './tenant-login.model';

export interface ILoginInformation {
    application: IApplicationInfoDto;
    user: UserLoginInfoDto;
    tenant: ITenantLoginInfoDto;
    impersonatorUserId?: number;
    impersonatorTenantId?: number;
}
