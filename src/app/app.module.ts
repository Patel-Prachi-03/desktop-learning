import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdatePopUpComponent } from './update-pop-up/update-pop-up.component';
import { DeletePopUpComponent } from './delete-pop-up/delete-pop-up.component';
import { InterceptorService} from './interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    SignupComponent,
    HomepageComponent,
    DashboardComponent,
    UpdatePopUpComponent,
    DeletePopUpComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,  // This ensures that multiple interceptors can be applied
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
