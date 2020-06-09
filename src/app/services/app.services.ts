
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IrsAlertService, IrsDialogService, IrsDtoMetadataService, IrsHttpService, IrsNotificationService } from '@irshadali/controls';
import { IrsStoreService } from './store.service';

@Injectable()
export class AppServices {

  constructor(
    public router: Router,
    public location: Location,
    public http: IrsHttpService,
    public notification: IrsNotificationService,
    public alert: IrsAlertService,
    public dialog: IrsDialogService,
    public meta: IrsDtoMetadataService,
    public store: IrsStoreService,
  ) { }
}
