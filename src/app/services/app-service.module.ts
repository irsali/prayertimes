
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServices } from './app.services';
import { IrsStoreService } from './store.service';
import { ErrorInterceptor } from './error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeoService } from './geo.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppServicesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppServicesModule,
      providers: [
        AppServices,
        IrsStoreService,
        GeoService,
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: TokenInterceptor,
        //   multi: true
        // },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        },
      ]
    };
  }

}

