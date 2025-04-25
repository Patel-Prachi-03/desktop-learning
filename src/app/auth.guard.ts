import {inject} from '@angular/core';
import { CanActivateFn ,Router} from '@angular/router';
import { StorageService } from './storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loStorage=inject(StorageService)
  let crd=loStorage.getCredentials('token');
  const router=inject(Router)
  if(crd==null){
    router.navigate(['/login'])
    return false
  }
  return true;
};
