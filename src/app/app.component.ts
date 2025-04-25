import { Component ,inject} from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Project1';
  loStorage=inject(StorageService)
  router=inject(Router)
  logout(){
    this.loStorage.clearcredentials("token")
    this.loStorage.clearcredentials("username") 
    this.router.navigate(['/login'])
  }
}
