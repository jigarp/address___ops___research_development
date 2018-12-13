import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  template: `
      <h1 mat-dialog-title>Add file</h1>
      <mat-dialog-content>
        
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button type="submit" (click)="onSubmit()">Ok</button>
        <button mat-button type="button" (click)="close()">Cancel</button>
      </mat-dialog-actions>
  `
})
export class UpdateDialogComponent implements OnInit {


  constructor(
    private dialogRef: MatDialogRef<UpdateDialogComponent>
  ) {}

  ngOnInit() {

  }

  onSubmit() {
    this.dialogRef.close('submit');
  }

  close() {
    this.dialogRef.close('cancel');
  }
}
