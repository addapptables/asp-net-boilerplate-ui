import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './localization/i18n.localization';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducres';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ResponsiveModule } from '@addapptables/responsive';
import { AlertModule } from '@addapptables/alert';
import { ModalModule } from '@addapptables/modal';
import { NotifierModule } from '@addapptables/notifier';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { AddapptableRouterSerializer } from './shared/router-serializer.shared';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddapptablesBoilerplateModule } from '@addapptable/components/addapptables-boilerplate/addapptables-boilerplate.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    ResponsiveModule,
    AuthModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    NotifierModule.forRoot(),
    AddapptablesBoilerplateModule.forRoot()
  ],
  providers: [
    {
      provide: RouterStateSerializer, useClass: AddapptableRouterSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
