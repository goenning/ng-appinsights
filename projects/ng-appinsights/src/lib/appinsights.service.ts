import { Injectable, InjectionToken, Inject } from '@angular/core';
import { AppInsightsConfig } from '../public-api';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

export const APP_INSIGHTS_CONFIG = new InjectionToken<string>('APP_INSIGHTS_CONFIG');

@Injectable()
export class AppInsightsService {
  constructor(@Inject(APP_INSIGHTS_CONFIG) config: AppInsightsConfig
  ) {
    const appInsights = new ApplicationInsights({ config });
    appInsights.loadAppInsights();
  }
}
