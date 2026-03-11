import {ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners,} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {ProvideLucideIcons} from './core/fabrics/provide-lucide-icons';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {apiInterceptor} from './shared/interceptors/api.interceptor';
import {errorsInterceptor} from './shared/interceptors/error.interceptor';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(ProvideLucideIcons()),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([apiInterceptor, errorsInterceptor])),
    provideAnimationsAsync(),
  ],
};
