import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.service';


export const appConfig: ApplicationConfig = {
   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
   provideHttpClient(withInterceptors([authInterceptor]))

   ]
};
