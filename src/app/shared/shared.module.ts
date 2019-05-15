import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AddapptablePerfectScrollbarModule } from '@addapptables/perfect-scrollbar';
import { CardModule } from '@addapptables/card';
import { MatIconModule } from '@angular/material';
import { MomentFormatPipe } from './pipes/moment-format.pipe';
import { IsGrantedPipe } from './pipes/is-granted.pipe';
import { IsGrantedActionColumnPipe } from './pipes/is-granted-action-column.pipe';

@NgModule({
  declarations: [
    MomentFormatPipe,
    IsGrantedPipe,
    IsGrantedActionColumnPipe
  ],
  exports: [
    CommonModule,
    TranslateModule,
    AddapptablePerfectScrollbarModule,
    CardModule,
    MatIconModule,
    MomentFormatPipe,
    IsGrantedPipe,
    IsGrantedActionColumnPipe
  ]
})
export class SharedModule { }
