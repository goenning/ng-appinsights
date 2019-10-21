import { Injectable, InjectionToken, Inject, Optional } from '@angular/core';
import { AppInsightsConfig } from './appinsights.config';
import {
  ApplicationInsights,
  ITelemetryItem,
  IPageViewTelemetry,
  IExceptionTelemetry,
  ITraceTelemetry,
  IMetricTelemetry,
  IEventTelemetry
} from '@microsoft/applicationinsights-web';
import { ICustomProperties } from '@microsoft/applicationinsights-core-js';

export const APP_INSIGHTS_CONFIG = new InjectionToken<string>('APP_INSIGHTS_CONFIG');

type TelemetryInitializer = (item: ITelemetryItem) => boolean | void;

@Injectable({
  providedIn: 'root'
})
export class AppInsightsService {
  private appInsights: ApplicationInsights;
  private isInitialized: boolean;

  constructor(
    @Optional() @Inject(APP_INSIGHTS_CONFIG) private config: AppInsightsConfig
  ) {
    this.init(this.config);
  }

  public get ai(): ApplicationInsights {
    return this.appInsights;
  }

  /**
   * Initialize this instance of ApplicationInsights
   */
  public init(config: AppInsightsConfig) {
    if (!this.appInsights) {
      this.appInsights = new ApplicationInsights({ config });
    }

    if (!this.isInitialized && config && config.instrumentationKey) {
      this.appInsights.config = config;
      this.appInsights.loadAppInsights();
      this.isInitialized = true;
    }
  }

  /**
   * Registers a Telemetry Initializer
   */
  public addTelemetryInitializer(telemetryInitializer: TelemetryInitializer): void {
    const addInitializer = () => {
      this.appInsights.addTelemetryInitializer(telemetryInitializer);
    };

    if (this.ai.context) {
      addInitializer();
    } else if (this.ai.snippet.queue) {
      this.ai.snippet.queue.push(addInitializer);
    }
  }

  /**
   * Log a user action or other occurrence.
   */
  public trackEvent(event: string | IEventTelemetry, customProperties?: ICustomProperties) {
    const eventTelemetry = typeof event === 'string' ? { name: event } : event;
    if (this.isInitialized) {
      this.ai.trackEvent(eventTelemetry, customProperties);
    } else if (this.ai.snippet.queue) {
      this.ai.snippet.queue.push(() => this.ai.trackEvent(eventTelemetry, customProperties));
    }
  }

  /**
   * Logs that a page, or similar container was displayed to the user.
   */
  trackPageView(pageView?: IPageViewTelemetry): void {
    if (this.isInitialized) {
      this.ai.trackPageView(pageView);
    } else if (this.ai.snippet.queue) {
      this.ai.snippet.queue.push(() => this.ai.trackPageView(pageView));
    }
  }

  /**
   * Log an exception that you have caught.
   */
  trackException(exception: IExceptionTelemetry): void {
    if (this.isInitialized) {
      this.ai.trackException(exception);
    } else if (this.ai.snippet.queue) {
      this.ai.snippet.queue.push(() => this.ai.trackException(exception));
    }
  }

  /**
   * Log a diagnostic scenario such entering or leaving a function.
   */
  trackTrace(trace: ITraceTelemetry, customProperties?: ICustomProperties): void {
    if (this.isInitialized) {
      this.ai.trackTrace(trace, customProperties);
    } else if (this.ai.snippet.queue) {
      this.ai.snippet.queue.push(() => this.ai.trackTrace(trace, customProperties));
    }
  }

  /**
   * Log a numeric value that is not associated with a specific event. Typically used
   * to send regular reports of performance indicators.
   *
   * To send a single measurement, just use the `name` and `average` fields
   * of {@link IMetricTelemetry}.
   *
   * If you take measurements frequently, you can reduce the telemetry bandwidth by
   * aggregating multiple measurements and sending the resulting average and modifying
   * the `sampleCount` field of {@link IMetricTelemetry}.
   */
  trackMetric(metric: IMetricTelemetry, customProperties?: ICustomProperties): void {
    if (this.isInitialized) {
      this.ai.trackMetric(metric, customProperties);
    } else if (this.ai.snippet.queue) {
      this.ai.snippet.queue.push(() => this.ai.trackMetric(metric, customProperties));
    }
  }

  /**
   * Manually trigger an immediate send of all telemetry still in the buffer.
   */
  flush(async?: boolean): void {
    if (this.isInitialized) {
      this.ai.flush(async);
    }
  }

  /**
   * Set the authenticated user id and the account id. Used for identifying a specific signed-in user.
   * Parameters must not contain whitespace or ,;=|
   *
   * The method will only set the `authenicatedUserId` and `accountId` in the curent page view.
   * To set them for the whole sesion, you should set `storeInCookie = true`
   */
  setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie?: boolean): void {
    if (this.isInitialized) {
      this.ai.setAuthenticatedUserContext(authenticatedUserId, accountId, storeInCookie);
    } else if (this.ai.snippet.queue) {
      this.ai.snippet.queue.push(() => this.ai.setAuthenticatedUserContext(authenticatedUserId, accountId, storeInCookie));
    }
  }
}
