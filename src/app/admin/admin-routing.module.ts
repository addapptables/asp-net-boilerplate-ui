import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AppRouteGuard } from '../shared/services/auth-route-guard.service';

const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    canActivateChild: [AppRouteGuard],
    children: [
        {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full'
        },
        {
            path: 'profile',
            loadChildren: 'src/app/admin/profile/profile.module#ProfileModule',
        },
        {
            path: 'users',
            loadChildren: 'src/app/admin/user/user.module#UserModule',
            data: { permission: 'Pages.Administration.Users' }
        },
        {
            path: 'tenants',
            loadChildren: 'src/app/admin/tenant/tenant.module#TenantModule',
            data: { permission: 'Pages.Tenants' }
        },
        {
            path: 'editions',
            loadChildren: 'src/app/admin/edition/edition.module#EditionModule',
            data: { permission: 'Pages.Editions' }
        },
        {
            path: 'roles',
            loadChildren: 'src/app/admin/role/role.module#RoleModule',
            data: { permission: 'Pages.Administration.Roles' }
        },
        {
            path: 'organization-units',
            loadChildren: 'src/app/admin/organization-unit/organization-unit.module#OrganizationUnitModule',
            data: { permission: 'Pages.Administration.Roles' }
        },
        {
            path: 'accountancy',
            loadChildren: 'src/app/admin/accountancy/accountancy.module#AccountancyModule',
            data: { permission: 'Pages.Public' }
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
