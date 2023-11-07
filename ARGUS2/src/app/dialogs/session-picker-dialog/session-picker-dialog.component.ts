import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IOfflineViewState } from 'src/app/store/reducers/offline-view.reducer';
import { SessionPickerDialogController } from './controller/session-picker-dialog.controller';

@Component({
  selector: 'app-session-picker-dialog',
  templateUrl: './session-picker-dialog.component.html',
  styleUrls: ['./session-picker-dialog.component.scss']
})
export class SessionPickerDialogComponent {

  // controller
  public sessionPickerDialogController!: SessionPickerDialogController;

  constructor( private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {sessions: any[] }, private store: Store<{offlineViewState: IOfflineViewState}> ){
    this.sessionPickerDialogController = new SessionPickerDialogController( this.data.sessions, this.store, this.dialog );
  }

}
