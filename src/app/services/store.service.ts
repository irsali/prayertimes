import { Injectable } from '@angular/core';

@Injectable()
export class IrsStoreService {

  private store: Storage;

  constructor() {
    this.store = localStorage;
  }

  setToken(token: string) {
    this.store.setItem('token', token);
  }

  getToken() {
    return this.store.getItem('token');
  }

  setRefreshToken(token: string) {
    this.store.setItem('refresh_token', token);
  }

  getRefreshToken() {
    return this.store.getItem('refresh_token');
  }

  setSelectedCalcMethod(value: string) {
    this.store.setItem('selected_calc_method', value);
  }

  getSelectedCalcMethod() {
    return this.store.getItem('selected_calc_method');
  }

  setSelectedSchool(value: string) {
    this.store.setItem('selected_school_of_thought', value);
  }

  getSelectedSchool() {
    return this.store.getItem('selected_school_of_thought');
  }

  setMidnightMode(value: string) {
    this.store.setItem('selected_midnight_mode', value);
  }

  getMidnightMode() {
    return this.store.getItem('selected_midnight_mode');
  }

  setLatitudeAdjustmentMethod(value: string) {
    this.store.setItem('selected_latitude_adjustment_method', value);
  }

  getLatitudeAdjustmentMethod() {
    return this.store.getItem('selected_latitude_adjustment_method');
  }

}
