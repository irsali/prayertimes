import { Injectable } from '@angular/core';

@Injectable()
export class GeoService {

  lat: number;
  lng: number;
  isLatLngAccessChecked = false;
  isLatLngFound = false;

  constructor() {
  }

  async getSetLatLng() {
    return this.getCoordinates().then(
      (position: any) => {
        this.isLatLngAccessChecked = true;
        if (position && position.coords) {
          this.isLatLngFound = true;
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      },
      (error: any) => {
        this.isLatLngAccessChecked = true;
        this.isLatLngFound = false;
        console.log(error);
      });
  }

  private getCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}
