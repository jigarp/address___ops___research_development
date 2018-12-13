import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { NewComponentComponent } from './new-component/new-component.component';
import {MatNativeDateModule} from '@angular/material';
import {UpdateDialogComponent} from "./new-component/update-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    NewComponentComponent,
     // For Modal:
    UpdateDialogComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [    MatDatepickerModule],
  bootstrap: [AppComponent],
   // For Modal:
  entryComponents: [UpdateDialogComponent]
})
export class AppModule { }
