import { Injectable } from '@angular/core';

@Injectable()
export class IrsStoreService {

  private store: Storage;

  constructor() {
    this.store = localStorage;
  }

  logout(): any {
    this.store.removeItem('token');
    this.store.removeItem('refresh_token');
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

}
