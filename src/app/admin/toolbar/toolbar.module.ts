import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule, MatInputModule, MatIconModule, MatFormFieldModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { MenuModule } from '../menu/menu.module';
import { TranslateModule } from '@addapptable/components/translate/translate.module';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { MenuModule as AddapptableMenuModule } from '@addapptables/menu';
import { OrganizationUnitToolbarComponent } from './components/organization-unit-toolbar/organization-unit-toolbar.component';

@NgModule({
  imports: [
    SharedModule,
    MatToolbarModule,
    MenuModule,
    AddapptableMenuModule,
    TranslateModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule
  ],
  declarations: [ToolbarComponent, SearchComponent, ProfileComponent, OrganizationUnitToolbarComponent],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
