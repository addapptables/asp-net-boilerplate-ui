import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule, MatTableModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  exports: [
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class SharedTablesModule { }
