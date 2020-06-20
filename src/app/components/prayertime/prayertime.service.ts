import { Injectable } from '@angular/core';
import { IrsHttpService } from '@irshadali/controls';

@Injectable()
export class PrayerTimeService {

  private baseUrl = '//api.aladhan.com/v1/';

  constructor(private http: IrsHttpService) {
    this.http.setApiUrl(this.baseUrl);
  }

  public getTodayPrayerTimes(
    latitude: number, longitude: number, method: number, school: number = 3, midnightMode: number = 0, latitudeAdjustmentMethod: number = 0
  ) {
    const timestamp = new Date().getTime() / 1000;
    return this.http.get(`timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=${method}`);
  }

  public getThisMonthPrayerTimes(lat: number, lng: number) {
    const timestamp = new Date().getTime() / 1000;
    return this.http.get(`${timestamp}?latitude=${lat}&longitude=${lng}`);
  }

  public getMethodsOfCalc() {
    const timestamp = new Date().getTime() / 1000;
    return this.http.get(`${timestamp}`);
  }
}
