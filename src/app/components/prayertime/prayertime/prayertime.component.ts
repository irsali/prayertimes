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
  selectedCalcMethod: any;
  midnightMode: number;
  latitudeAdjustmentMethod: number;
  selectedSchool: number;
  schools: string[];
  tabSelectedIndex: number;

  constructor(private appServices: AppServices, private prayerTimeService: PrayerTimeService) { }

  async ngOnInit() {
    this.tabSelectedIndex = 2;
    this.calcMethods = this.appServices.getCalcMethods();
    this.schools = this.appServices.getSchools();

    // lat/lng is required to load upfront before selected{Properties}
    if (!this.appServices.geo.isLatLngFound) {
      await this.appServices.geo.getSetLatLng();
    }

    // if selectedCalcMethod is already stored with us use that, otherwise default
    const selectedCalcMethod = this.appServices.store.getSelectedCalcMethod();
    this.selectedCalcMethod = selectedCalcMethod === null ? 2 : Number(selectedCalcMethod);;

    const selectedSchool = this.appServices.store.getSelectedSchool();
    this.selectedSchool = selectedSchool === null ? 1 : Number(selectedSchool);

    const midnightMode = this.appServices.store.getMidnightMode();
    this.midnightMode = midnightMode === null ? 1 : Number(midnightMode);

    const latitudeAdjustmentMethod = this.appServices.store.getLatitudeAdjustmentMethod();
    this.latitudeAdjustmentMethod = latitudeAdjustmentMethod === null ? 0 : Number(latitudeAdjustmentMethod);;

  }

  calMethodSelectionChange($event) {
    // console.log($event);
    // store to show preselected next time
    this.appServices.store.setSelectedCalcMethod(String($event.value));
  }

  schoolSelectionChange($event) {
    // store to show preselected next time
    this.appServices.store.setSelectedSchool(String($event.value));
  }

  refresh() {
    // find selected tab
    this.selectedCalcMethod = 10;

    // update the data of selected tab

  }

}
