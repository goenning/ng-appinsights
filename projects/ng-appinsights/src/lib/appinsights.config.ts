import { IConfiguration, IConfig } from '@microsoft/applicationinsights-web';

type AIConfig = IConfiguration & IConfig;

export interface AppInsightsConfig extends AIConfig {

}
