import { ErrorHandler, Injectable } from '@angular/core';

import { AppInsightsService } from './appinsights.service';

@Injectable()
export class AppInsightsErrorHandler implements ErrorHandler {
  constructor(private appInsights: AppInsightsService) {}

  handleError(exception: any) {
    if (exception) {
      console.error(exception);
      this.appInsights.trackException({ exception });
    }
  }
}
