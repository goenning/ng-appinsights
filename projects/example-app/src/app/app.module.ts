import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_INSIGHTS_CONFIG, AppInsightsErrorHandler } from 'projects/ng-appinsights/src';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppInsightsErrorHandler },
    {
      provide: APP_INSIGHTS_CONFIG,
      useValue: {
        instrumentationKey: '9869de23-54e7-44ca-be03-15e92cfdf551',
        enableAutoRouteTracking: true,
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
