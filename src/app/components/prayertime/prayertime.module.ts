import { NgModule } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { CommonModule } from '@angular/common';
import { PrayerTimeComponent } from './prayertime/prayertime.component';
import { Routes, RouterModule } from '@angular/router';
import { PrayerTimeService } from './prayertime.service';
import { SharedModule } from '@irshadali/controls';
import { PrayerTodayComponent } from './prayertime/prayer-today/prayer-today.component';
import { PrayerDateRangeComponent } from './prayertime/prayer-date-range/prayer-date-range.component';

const routes: Routes = [
  {
    path: '', component: PrayerTimeComponent,
  },
  // {
  //   path: ':category/:title', component: BlogsComponent,
  // }
];

@NgModule({
  declarations: [PrayerTimeComponent, PrayerTodayComponent, PrayerDateRangeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule.forRoot(),
    NgxPrintModule
  ],
  providers: [
    PrayerTimeService
  ]
})
export class PrayerTimeModule { }
