import { Component, OnInit } from '@angular/core';
import { AppServices } from 'src/app/services/app.services';
import { PrayerTimeService } from '../prayertime.service';

@Component({
  selector: 'app-prayertime',
  templateUrl: './prayertime.component.html',
  styleUrls: ['./prayertime.component.scss']
})
export class PrayerTimeComponent implements OnInit {
  calcMethods: any[];
  asarCalcMethods: any[];
  todayPrayerTimes: any[];
  todayOtherTimes: any[];
  selectedCalcMethod: any;
  midnightMode: number;
  latitudeAdjustmentMethod: number;
  selectedSchool: number;
  tempData: any;
  schools: string[];

  constructor(private appServices: AppServices, private prayerTimeService: PrayerTimeService) { }

  async ngOnInit() {
    this.calcMethods = this.appServices.getCalcMethods();
    if (!this.appServices.geo.isLatLngFound) {
      await this.appServices.geo.getSetLatLng();
    }

    this.schools = this.appServices.getSchools();

    // if selectedCalcMethod is already stored with us use that, otherwise default
    this.selectedCalcMethod = this.appServices.store.getSelectedCalcMethod() || 2;

    const selectedSchool = this.appServices.store.getSelectedSchool();
    this.selectedSchool = selectedSchool === null ? 1 : Number(selectedSchool);

    const midnightMode = this.appServices.store.getMidnightMode();
    this.midnightMode = midnightMode === null ? 1 : Number(midnightMode);

    const latitudeAdjustmentMethod = this.appServices.store.getLatitudeAdjustmentMethod();
    this.latitudeAdjustmentMethod = latitudeAdjustmentMethod === null ? 0 : Number(latitudeAdjustmentMethod);;

    this.getTodaysData();

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

  calMethodSelectionChange($event) {
    // console.log($event);
    this.appServices.store.setSelectedCalcMethod(String($event.value));
  }

  schoolSelectionChange($event) {
    this.appServices.store.setSelectedSchool(String($event.value));
  }

  refresh() {
    // find selected tab

    // update the data of selected tab

  }

}
