import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewChild } from '@angular/core';
import { AppServices } from 'src/app/services/app.services';
import { PrayerTimeService } from '../../prayertime.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-prayer-date-range',
  templateUrl: './prayer-date-range.component.html',
  styleUrls: ['./prayer-date-range.component.scss']
})
export class PrayerDateRangeComponent implements OnInit, OnChanges {

  @Input() selectedSchool: number;
  @Input() selectedCalcMethod: any;
  @Input() midnightMode: number;
  @Input() latitudeAdjustmentMethod: number;
  @ViewChild('prayerTable') prayerTable: MatTable<any>;

  dayPrayers: any[];
  tempData: any;
  columnsToDisplay: any[];
  columns: any[];
  startDate: Date;
  numberOfDays: number;

  constructor(private appServices: AppServices, private prayerTimeService: PrayerTimeService) { }

  ngOnInit(): void {
    this.onInit();
  }

  onInit() {
    this.dayPrayers = [];
    this.populatePrayerColumns();
    this.updateDisplayColumns();
    this.startDate = new Date();
    this.numberOfDays = 7;
  }

  updateDisplayColumns() {
    this.columnsToDisplay = this.columns.filter(y => y.isDisplay === true).map(y => y.name);
  }

  refresh() {
    this.getData();
  }

  checkboxChange() {
    // console.log(event.checked);
    // this.columns.filter(y => y.name === timing)[0].isDisplay = event.checked;
    this.updateDisplayColumns();
  }

  populatePrayerColumns(): void {
    const cols: any[] = [
      { name: 'Fajr', isDisplay: true },
      { name: 'Dhuhr', isDisplay: true },
      { name: 'Asr', isDisplay: true },
      { name: 'Maghrib', isDisplay: true },
      { name: 'Isha', isDisplay: true },
      { name: 'Sunrise', isDisplay: false },
      { name: 'Sunset', isDisplay: false },
      { name: 'Imsak', isDisplay: false }
    ];
    this.columns = cols;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedSchool !== undefined && this.selectedCalcMethod !== undefined &&
      this.midnightMode !== undefined && this.latitudeAdjustmentMethod !== undefined) {
      this.onInit();
      this.getData();
    }
  }

  getData() {
    this.dayPrayers = [];
    for (let i = 0; i < 7; i++) {
      const date = this.startDate;
      date.setDate(date.getDate() + i);
      const timestamp = date.getTime() / 1000;

      this.prayerTimeService.getPrayerTimes(
        timestamp, this.appServices.geo.lat, this.appServices.geo.lng, this.selectedCalcMethod, this.selectedSchool,
        this.midnightMode, this.latitudeAdjustmentMethod)
        .subscribe((x: any) => {
          if (x.code === 200) {
            this.tempData = x.data;
            const timings = x.data.timings;

            this.dayPrayers.push(timings);
            // this.todayPrayerTimes.push({ name: 'Fajr', value: timings['Fajr'] });
            // this.todayPrayerTimes.push({ name: 'Dhuhr', value: timings['Dhuhr'] });
            // this.todayPrayerTimes.push({ name: 'Asr', value: timings['Asr'] });
            // this.todayPrayerTimes.push({ name: 'Maghrib', value: timings['Maghrib'] });
            // this.todayPrayerTimes.push({ name: 'Isha', value: timings['Isha'] });
            // this.todayOtherTimes.push({ name: 'Sunrise', value: timings['Sunrise'] });
            // this.todayOtherTimes.push({ name: 'Sunset', value: timings['Sunset'] });
            // this.todayOtherTimes.push({ name: 'Imsak', value: timings['Imsak'] });
            if (this.prayerTable) {
              this.prayerTable.renderRows();
            }
          } else {
            console.log(x);
          }
        });
    }
  }

}

