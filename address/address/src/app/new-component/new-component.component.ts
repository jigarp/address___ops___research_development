import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef} from '@angular/material';
import {UpdateDialogComponent} from './update-dialog.component';


@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css']
})
export class NewComponentComponent implements OnInit, OnDestroy {
   // addressUpdateControl = new FormControl('');
   // For Modal:
  updateDialogRef: MatDialogRef<UpdateDialogComponent>;


  person = {
    line1: '21405 Riverview Court',
    primaryCity: '',
    primaryState: ''
  };

  updatePerson = new FormGroup({
    line1: new FormControl(null, Validators.minLength(2), Validators.nullValidator()),
    primaryCity: new FormControl(null, Validators.minLength(2), Validators.nullValidator()),
  });

  constructor(
     // For Modal:
    private dialog: MatDialog) { }

  ngOnInit() {
    this.setFormValues();
  }

  ngOnDestroy() {

  }

  // For Modal:
  openDialog() {
    this.updateDialogRef = this.dialog.open(UpdateDialogComponent);

    this.updateDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'submit') {
        alert('ayyy');
      }
    });

  }

  onSubmit(){

  }


   // Form Tools (For validation messages) **Required for Angular7+**

   // Form Setters:
  setFormValues() {
   // this.updatePerson.get('line1').setValue(this.person.line1);
   // this.updatePerson.get('primaryCity').setValue(this.person.primaryCity);
  }

  get line1(): any { return this.updatePerson.get('line1'); }
  get primaryCity(): any { return this.updatePerson.get('primaryCity'); }


}

