import { Component, Inject } from '@angular/core';
import { HttpcallService } from '../httpcall.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-pop-up',
  standalone: false,
  templateUrl: './update-pop-up.component.html',
  styleUrls: ['./update-pop-up.component.css']
})
export class UpdatePopUpComponent {
  updationForm: any;

  // Inject the dialog reference for closing the dialog
  constructor(
    private myservice: HttpcallService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdatePopUpComponent> // Inject MatDialogRef
  ) {
    this.updationForm = this.fb.group({
      username: [data.username, [Validators.required]],
      password: [data.password, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [data.confirmPassword, [Validators.required, Validators.minLength(8)]],
      email: [data.email, [
        Validators.required, 
        Validators.pattern((/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
      ]],
      gender: [data.gender, [Validators.required]],
      address: [data.address, [Validators.required]],
      age: [data.age, [Validators.required]]
    });
  }

  get f() {
    return this.updationForm.controls;
  }

  update() {
    console.log("Updating user details...");
    console.log(this.updationForm.value.id);
    
    this.myservice.updateUser(this.data.id, this.updationForm.value).subscribe(
      (rs) => {
        console.log(rs);
        this.router.navigate(['/dashboard']);
        this.closePopup(); // Close the popup after successful update
      },
      (error) => {
        console.error('Update failed', error);
        // Optionally handle errors (e.g., show error message)
      }
    );
  }

  // Method to close the popup (dialog)
  closePopup() {
    this.dialogRef.close(); // This will close the dialog
  }
}
