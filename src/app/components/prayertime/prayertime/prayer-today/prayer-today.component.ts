import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppServices } from 'src/app/services/app.services';
import { PrayerTimeService } from '../../prayertime.service';

@Component({
  selector: 'app-prayer-today',
  templateUrl: './prayer-today.component.html',
  styleUrls: ['./prayer-today.component.scss']
})
export class PrayerTodayComponent implements OnInit, OnChanges {

  @Input() selectedSchool: number;
  @Input() selectedCalcMethod: any;
  @Input() midnightMode: number;
  @Input() latitudeAdjustmentMethod: number;

  todayPrayerTimes: any[];
  todayOtherTimes: any[];
  tempData: any;

  constructor(private appServices: AppServices, private prayerTimeService: PrayerTimeService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedSchool !== undefined && this.selectedCalcMethod !== undefined &&
      this.midnightMode !== undefined && this.latitudeAdjustmentMethod !== undefined) {
      this.getTodaysData();
    }
  }

  getTodaysData() {
    this.prayerTimeService.getTodayPrayerTimes(
      this.appServices.geo.lat, this.appServices.geo.lng, this.selectedCalcMethod, this.selectedSchool,
      this.midnightMode, this.latitudeAdjustmentMethod)
      .subscribe((x: any) => {
        if (x.code === 200) {
          this.tempData = x.data;
          const timings = x.data.timings;
          this.todayPrayerTimes = [];
          this.todayPrayerTimes.push({ name: 'Fajr', value: timings['Fajr'] });
          this.todayPrayerTimes.push({ name: 'Dhuhr', value: timings['Dhuhr'] });
          this.todayPrayerTimes.push({ name: 'Asr', value: timings['Asr'] });
          this.todayPrayerTimes.push({ name: 'Maghrib', value: timings['Maghrib'] });
          this.todayPrayerTimes.push({ name: 'Isha', value: timings['Isha'] });

          this.todayOtherTimes = [];
          this.todayOtherTimes.push({ name: 'Sunrise', value: timings['Sunrise'] });
          this.todayOtherTimes.push({ name: 'Sunset', value: timings['Sunset'] });
          this.todayOtherTimes.push({ name: 'Imsak', value: timings['Imsak'] });

        } else {
          console.log(x);
        }
      });
  }

}
