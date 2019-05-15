import { InjectionToken } from '@angular/core';
import { ConfigurationModel } from './models/configuration.model';

export const CONFIGURATION_BOILERPLATE = new InjectionToken<ConfigurationModel>('CONFIGURATION_BOILERPLATE');
