export interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface Weekday {
  en: string;
  ar?: string;
}

export interface Month {
  number: number;
  en: string;
  ar?: string;
}

export interface Designation {
  abbreviated: string;
  expanded: string;
}

export interface Calendar {
  date: string;
  format: string;
  day: string;
  weekday: Weekday;
  month: Month;
  year: string;
  designation: Designation;
  holidays?: string[];
}

export interface Date {
  readable: string;
  timestamp: string;
  gregorian: Calendar;
  hijri: Calendar;
}

export interface Params {
  Fajr: number;
  Isha: number;
}

export interface Method {
  id: number;
  name: string;
  params: Params;
}

export interface Meta {
  latitude: number;
  longitude: number;
  timezone: string;
  method: Method;
  latitudeAdjustmentMethod: string;
  midnightMode: string;
  school: string;
  offset: Timings;
}

export interface PrayerTimingsData {
  timings: Timings;
  date: Date;
  meta: Meta;
}



