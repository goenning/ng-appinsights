import { Component } from '@angular/core';
import { AppInsightsService } from 'projects/ng-appinsights/src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  count = 0;

  constructor(private appInsights: AppInsightsService) {
  }

  increment(): void {
    this.count++;
    this.appInsights.trackEvent('increment', { count: this.count });
  }

  decrement(): void {
    this.count--;
    this.appInsights.trackEvent('decrement', { count: this.count });
  }

  initAI(): void {
    this.appInsights.init({
      instrumentationKey: '9869de23-54e7-44ca-be03-15e92cfdf551'
    });
  }

  addLogger(): void {
    this.appInsights.addTelemetryInitializer(envelope => {
      console.log(envelope);
    });
  }

  forceError(): void {
    throw new Error('boom!');
  }
}
