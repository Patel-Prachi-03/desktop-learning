import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { HttpcallService } from '../httpcall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  loginForm: any;


  constructor(private fb:FormBuilder,
    private storageService :StorageService,
    private router : Router,
    private service: HttpcallService) {}

    ngOnInit():void{
      this.loginForm=this.fb.group(
        {
            username:['',[Validators.required]],
            password:['',[Validators.required]]
        }
      );
      
    }

    onSubmit(){
     
      this.service.loginUser(this.loginForm.value).subscribe(data=>
        {
          console.log("login error")
          const res=JSON.parse(data)
          console.log(data)
          localStorage.setItem('token',res.token)
          localStorage.setItem('username',res.username)
          this.router.navigate(['/dashboard']);
     
        },
        (error) => {
          // Handle login failure
          console.error('Login failed', error);
          alert('Invalid username or password');
        }
      
      )
    }

    get f(){
      return this.loginForm.controls;
    }
    closeLogin(){
      this.router.navigate(["/home"])
    }
}
