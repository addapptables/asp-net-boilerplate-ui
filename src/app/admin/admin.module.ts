import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from './menu/menu.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { ProgressBarModule } from '@addapptable/components/progress-bar/progress-bar.module';
import { AddapptableContainerModule } from '@addapptable/components/addapptable-container/addapptable-container.module';
import { AppRouteGuard } from '../shared/services/auth-route-guard.service';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule,
        MenuModule,
        ToolbarModule,
        ProgressBarModule,
        AddapptableContainerModule
    ],
    declarations: [LayoutComponent],
    providers: [AppRouteGuard]
})
export class AdminModule { }
