import { Component } from '@angular/core';
import { HttpcallService } from '../httpcall.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
 
  registrationForm : any

  constructor(private myservice: HttpcallService,private fb :FormBuilder, private router : Router) {
   this.registrationForm=this.fb.group(
    {
      username:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]],
      email:['',[Validators.required,Validators.pattern((/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))]],
      gender:['',[Validators.required]],
      address:['',[Validators.required]],
      cpassword:['',[Validators.required,Validators.minLength(8)]],
      age:['',[Validators.required]]
    }
   )
  }

  get f(){
    return this.registrationForm.controls;
  }

  saveStudent(){
 
    this.myservice.saveUser(this.registrationForm.value).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.router.navigate(["/login"])
      },
      (error) => {
        console.error('Error during user registration:', error);
      }
    );

   }

   closeForm(){
    this.router.navigate(["/home"])
   }
 
}
