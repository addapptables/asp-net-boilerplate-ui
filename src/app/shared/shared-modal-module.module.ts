import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { ModalModule } from '@addapptables/modal';

@NgModule({
    exports: [
        MatDialogModule,
        ModalModule,
    ]
})
export class SharedModalModule { }
