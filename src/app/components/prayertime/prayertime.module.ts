import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrayerTimeComponent } from './prayertime/prayertime.component';
import { Routes, RouterModule } from '@angular/router';
import { PrayerTimeService } from './prayertime.service';
import { SharedModule } from '@irshadali/controls';
import { PrayerTodayComponent } from './prayertime/prayer-today/prayer-today.component';
import { PrayerWeekComponent } from './prayertime/prayer-week/prayer-week.component';
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
  declarations: [PrayerTimeComponent, PrayerTodayComponent, PrayerWeekComponent, PrayerDateRangeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule.forRoot(),
  ],
  providers: [
    PrayerTimeService
  ]
})
export class PrayerTimeModule { }
