import { Injectable, InjectionToken, Inject } from '@angular/core';
import { AppInsightsConfig } from '../public-api';
import { ApplicationInsights, IExceptionTelemetry } from '@microsoft/applicationinsights-web';

export const APP_INSIGHTS_CONFIG = new InjectionToken<string>('APP_INSIGHTS_CONFIG');

@Injectable()
export class AppInsightsService {
  private appInsights: ApplicationInsights | undefined;

  constructor(@Inject(APP_INSIGHTS_CONFIG) private config: AppInsightsConfig
  ) {
    if (config && config.instrumentationKey) {
      this.init(config.instrumentationKey);
    }
  }

  public init(instrumentationKey: string) {
    this.appInsights = new ApplicationInsights({
      config: { ...this.config, instrumentationKey }
    });
    this.appInsights.loadAppInsights();
  }

  public trackException(exception: IExceptionTelemetry): void {
    this.appInsights.trackException(exception);
  }
}
