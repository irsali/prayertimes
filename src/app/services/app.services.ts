
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IrsAlertService, IrsDialogService, IrsDtoMetadataService, IrsHttpService, IrsNotificationService } from '@irshadali/controls';
import { IrsStoreService } from './store.service';
import { GeoService } from './geo.service';

@Injectable()
export class AppServices {
  data: { calc_methods: {}, school: Array<string>, midnight_mode: Array<string> };

  constructor(
    public router: Router,
    public location: Location,
    public http: IrsHttpService,
    public notification: IrsNotificationService,
    public alert: IrsAlertService,
    public dialog: IrsDialogService,
    public meta: IrsDtoMetadataService,
    public store: IrsStoreService,
    public geo: GeoService,
  ) {
    this.init();
  }

  init() {
    this.data = {} as any;
    this.data.calc_methods = {
      MWL: {
        id: 3,
        name: 'Muslim World League', params: { Fajr: 18, Isha: 17 }
      },
      ISNA: {
        id: 2, name: 'Islamic Society of North America (ISNA)', params: { Fajr: 15, Isha: 15 }
      },
      EGYPT: {
        id: 5, name: 'Egyptian General Authority of Survey', params: { Fajr: 19.5, Isha: 17.5 }
      },
      MAKKAH: {
        id: 4, name: 'Umm Al-Qura University, Makkah', params: { Fajr: 18.5, Isha: '90 min' }
      },
      KARACHI: {
        id: 1, name: 'University of Islamic Sciences, Karachi', params: { Fajr: 18, Isha: 18 }
      },
      TEHRAN: {
        id: 7, name: 'Institute of Geophysics, University of Tehran', params: { Fajr: 17.7, Isha: 14, Maghrib: 4.5, Midnight: 'JAFARI' }
      },
      JAFARI: {
        id: 0, name: 'Shia Ithna-Ashari, Leva Institute, Qum', params: { Fajr: 16, Isha: 14, Maghrib: 4, Midnight: 'JAFARI' }
      },
      GULF: {
        id: 8, name: 'Gulf Region', params: { Fajr: 19.5, Isha: '90 min' }
      },
      KUWAIT: {
        id: 9, name: 'Kuwait', params: { Fajr: 18, Isha: 17.5 }
      },
      QATAR: {
        id: 10, name: 'Qatar', params: { Fajr: 18, Isha: '90 min' }
      },
      SINGAPORE: {
        id: 11, name: 'Majlis Ugama Islam Singapura, Singapore', params: { Fajr: 20, Isha: 18 }
      },
      FRANCE: {
        id: 12, name: 'Union Organization Islamic de France', params: { Fajr: 12, Isha: 12 }
      },
      TURKEY: {
        id: 13, name: 'Diyanet \u0130\u015fleri Ba\u015fkanl\u0131\u011f\u0131, Turkey', params: { Fajr: 18, Isha: 17 }
      },
      RUSSIA: {
        id: 14, name: 'Spiritual Administration of Muslims of Russia', params: { Fajr: 16, Isha: 15 }
      },
      CUSTOM: {
        id: 99
      }
    }

    this.data.school = ['Shafi', 'Hanafi'];
    this.data.midnight_mode = ['Standard (Mid Sunset to Sunrise)', 'Jafari (Mid Sunset to Fajr)'];

  }

  getCalcMethods() {
    const arr = [];
    Object.keys(this.data.calc_methods).forEach(x => {
      const obj = this.data.calc_methods[x];
      arr.push({ id: obj.id, name: obj.name });
    });
    return arr;
  }

  getSchools() {
    return this.data.school;
  }

}


