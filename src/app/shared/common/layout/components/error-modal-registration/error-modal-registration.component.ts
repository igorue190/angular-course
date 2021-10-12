import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'error-modal-registration',
  templateUrl: './error-modal-registration.component.html',
  styleUrls: ['./error-modal-registration.component.css']
})
export class ErrorModalRegistrationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ErrorModalRegistrationComponent>) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.dialogRef.close();
  }
}
