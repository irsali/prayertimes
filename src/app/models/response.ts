export interface Response<T> {
  code: number;
  status: string;
  data: T | any;
}

