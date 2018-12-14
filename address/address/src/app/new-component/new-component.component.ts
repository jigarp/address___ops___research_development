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
  devModeEnabled = true;
   // For Modal:
  updateDialogRef: MatDialogRef<UpdateDialogComponent>;

  mailingIsSameUnChecked = false;
  originalPerson: any;
  isSubmittingForm = false;

  // this should be initialized by rest call:
  person = {
    primaryLine1: '11625 Legends Court',
    primaryLine2: '',
    primaryCity: 'Atherton',
    primaryState: 'California',
    primaryZip: '93900',
    primaryCountry: 'United States',
    mailingIsSame: true,
    mailingLine1: '',
    mailingLine2: '',
    mailingCity: '',
    mailingState: '',
    mailingZip: '',
    mailingCountry: '',
  };
  states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
  countries = ["United States","Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];



  // form control initialize/validation setup:
  updatePerson = new FormGroup({
    primaryLine1: new FormControl(null, Validators.minLength(2) ),
    primaryLine2: new FormControl(),
    primaryCity: new FormControl(null, Validators.minLength(2) ),
    primaryState: new FormControl( ),
    primaryZip: new FormControl(null, Validators.compose([
      Validators.maxLength(10),
      Validators.minLength(5),
      Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')
    ]) ),
    primaryCountry: new FormControl( ),
    mailingIsSame: new FormControl(),
    mailingLine1: new FormControl(null, Validators.minLength(2) ),
    mailingLine2: new FormControl(),
    mailingCity: new FormControl(null, Validators.minLength(2) ),
    mailingState: new FormControl( ),
    mailingZip: new FormControl(null, Validators.compose([
      Validators.maxLength(10),
      Validators.minLength(5),
      Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')
    ]) ),
    mailingCountry: new FormControl( ),
  });

  constructor(
     // For Modal:
    private dialog: MatDialog) { }

  ngOnInit() {
    if (this.devModeEnabled) {
      this.setFormValues();
      this.originalPerson = JSON.parse(JSON.stringify(this.person));
    }
  }

  ngOnDestroy() {

  }

  // For Modal:
  openDialog() {
    this.updateDialogRef = this.dialog.open(UpdateDialogComponent);

    this.updateDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'submit') {
        // alert('submit');
      }
    });

  }

  // handle checkbox change for Mailing Is Same
  handleMailIsSame(mailIsSameBox) {
    if (mailIsSameBox._checked) {
      this.mailingIsSameUnChecked = true;
      // set diff, set mailingIsSame=false
    } else {
      this.mailingIsSameUnChecked = false;
      // set same, set mailingIsSame=true
      // TODO: change to: this.person.mailingine1 = deepCopy(this.person.primaryLine1)
      this.updatePerson.get('mailingLine1').setValue(this.person.primaryLine1);
      this.updatePerson.get('mailingLine2').setValue(this.person.primaryLine2);
      this.updatePerson.get('mailingCity').setValue(this.person.primaryCity);
      this.updatePerson.get('mailingState').setValue(this.person.primaryState);
      this.updatePerson.get('mailingZip').setValue(this.person.primaryZip);
      this.updatePerson.get('mailingCountry').setValue(this.person.primaryCountry);
    }
  }



  onSubmit() {
    this.isSubmittingForm = true;
    this.setPersonValuesForSubmission();
    console.log( this.updatePerson );
    if ( this.checkForEqual() ) alert('No changes seem to have been made');
    this.isSubmittingForm = false;
  }

  checkForEqual() {
    console.log(JSON.stringify(this.person));
    console.log(JSON.stringify(this.originalPerson));
    return JSON.stringify(this.person) === JSON.stringify(this.originalPerson);
  }

   // Form Tools (For validation messages) **Required for Angular7+**

   // Form Setters:
  setFormValues() {
    this.updatePerson.get('primaryLine1').setValue(this.person.primaryLine1);
    this.updatePerson.get('primaryLine2').setValue(this.person.primaryLine2);
    this.updatePerson.get('primaryCity').setValue(this.person.primaryCity);
    this.updatePerson.get('primaryState').setValue(this.person.primaryState);
    this.updatePerson.get('primaryZip').setValue(this.person.primaryZip);
    this.updatePerson.get('primaryCountry').setValue(this.person.primaryCountry);
    this.updatePerson.get('mailingIsSame').setValue(this.person.mailingIsSame);
    this.updatePerson.get('mailingLine1').setValue(this.person.mailingLine1);
    this.updatePerson.get('mailingLine2').setValue(this.person.mailingLine2);
    this.updatePerson.get('mailingCity').setValue(this.person.mailingCity);
    this.updatePerson.get('mailingState').setValue(this.person.mailingState);
    this.updatePerson.get('mailingZip').setValue(this.person.mailingZip);
    this.updatePerson.get('mailingCountry').setValue(this.person.mailingCountry);
  }
   // Form Getters:
  get primaryLine1(): any { return this.updatePerson.get('primaryLine1'); }
  get primaryLine2(): any { return this.updatePerson.get('primaryLine2'); }
  get primaryCity(): any { return this.updatePerson.get('primaryCity'); }
  get primaryState(): any { return this.updatePerson.get('primaryState'); }
  get primaryZip(): any { return this.updatePerson.get('primaryZip'); }
  get primaryCountry(): any { return this.updatePerson.get('primaryCountry'); }
  get mailingIsSame(): any { return this.updatePerson.get('mailingIsSame'); }
  get mailingLine1(): any { return this.updatePerson.get('mailingLine1'); }
  get mailingLine2(): any { return this.updatePerson.get('mailingLine2'); }
  get mailingCity(): any { return this.updatePerson.get('mailingCity'); }
  get mailingState(): any { return this.updatePerson.get('mailingState'); }
  get mailingZip(): any { return this.updatePerson.get('mailingZip'); }
  get mailingCountry(): any { return this.updatePerson.get('mailingCountry'); }


  // Person object Setters:
  setPersonValuesForSubmission() {
    this.person.primaryLine1 = this.updatePerson.value.primaryLine1;
  }

}

