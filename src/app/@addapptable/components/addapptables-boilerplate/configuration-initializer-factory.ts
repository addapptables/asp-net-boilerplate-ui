import { InitialConfigurationService } from './services/initial-configuration.service';

export function appInitializerConfigurationFactory(initialConfigurationService: InitialConfigurationService) {
    return initialConfigurationService.configuration;
}
