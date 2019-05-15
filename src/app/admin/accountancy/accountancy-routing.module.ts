import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'contacts',
      loadChildren: 'src/app/admin/accountancy/contact/contact.module#ContactModule',
      data: { permission: 'Pages.Public.Contacts' }
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountancyRoutingModule { }
