import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuardGuard: CanActivateFn = (route, state) => {

  const routerService = inject(Router);
  let token = localStorage.getItem("authToken") || '';
  let role = localStorage.getItem("userRole") || '';
  
  const canActivate = token != null && role === 'ADMIN';
  
  if(!canActivate){
    routerService.navigate(['/'])
  }
  
  return canActivate;
} 
