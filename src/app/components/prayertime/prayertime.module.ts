import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrayerTimeComponent } from './prayertime/prayertime.component';
import { Routes, RouterModule } from '@angular/router';
import { PrayerTimeService } from './prayertime.service';

const routes: Routes = [
  {
    path: '', component: PrayerTimeComponent,
  },
  // {
  //   path: ':category/:title', component: BlogsComponent,
  // }
];

@NgModule({
  declarations: [PrayerTimeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    PrayerTimeService
  ]
})
export class PrayerTimeModule { }
