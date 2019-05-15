import { NgModule, ModuleWithProviders, Injector, APP_INITIALIZER } from '@angular/core';
import { appInitializerFactory } from './app-initializer-factory';
import { AppSessionService } from './services/app-session.service';
import { InitialConfigurationService } from './services/initial-configuration.service';
import { TokenService } from './services/token.service';
import { UtilsService } from './services/util.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddapptableHttpInterceptor } from './services/interceptor.service';
import { AddapptableHttpConfiguration } from './services/http-configuration.service';
import { CONFIGURATION_BOILERPLATE } from './tokens';
import { appInitializerConfigurationFactory } from './configuration-initializer-factory';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class AddapptablesBoilerplateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AddapptablesBoilerplateModule,
      providers: [
        AppSessionService,
        InitialConfigurationService,
        TokenService,
        UtilsService,
        AddapptableHttpConfiguration,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AddapptableHttpInterceptor,
          multi: true
        },
        {
          provide: APP_INITIALIZER,
          useFactory: appInitializerFactory,
          deps: [Injector],
          multi: true
        },
        {
          provide: CONFIGURATION_BOILERPLATE,
          useFactory: appInitializerConfigurationFactory,
          deps: [InitialConfigurationService]
        }
      ]
    };
  }
}
