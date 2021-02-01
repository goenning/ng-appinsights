# ng-appinsights

A simple wrapper of Application Insights JS Library for Angular applications. 

Supported features are:
- Simple setup (no modules required)
- Deferred Initialization
- Built-in Global Error Handler

## Installation

Using npm:

```bash
npm install --save ng-appinsights
```

## Usage

To initialize Application Insights, add the following to your entry point module (usually `app.module.ts`):

```typescript
import { APP_INSIGHTS_CONFIG } from 'ng-appinsights';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: APP_INSIGHTS_CONFIG,
      useValue: {
        instrumentationKey: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx',
        enableAutoRouteTracking: true,
        // Visit https://github.com/microsoft/ApplicationInsights-JS to know all possible configurations.
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Import the `AppInsightsService` into your components and use the available tracking methods.

```typescript
import { Component } from '@angular/core';
import { AppInsightsService } from 'ng-appinsights';

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
}
```

## Deferred Initialization

You may also skip the configuration on the Module and do it using the Service at any time.

```typescript
import { Component } from '@angular/core';
import { AppInsightsService } from 'ng-appinsights';

@Component({
  selector: 'app-root',
  templateUrl: './my.component.html'
})
export class MyComponent {
  constructor(private appInsights: AppInsightsService) {
  }

  init(): void {
    this.appInsights.init({
      instrumentationKey: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx',
    });
  }
}
```

## Global Error Handler

You may also include the built-in Error Handler which will automatically send exception events to AI for every errors that occurs inside your application.

```typescript
import { AppInsightsErrorHandler } from 'ng-appinsights';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppInsightsErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
