import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuardGuard: CanActivateFn = (route, state) => {
    
  const routerService = inject(Router);
  
  let token = localStorage.getItem("authToken") || '';
  let role = localStorage.getItem("userRole") || '';
  const canActivate = token != null && (role === 'ADMIN' || role === 'USER');
  
  if(!canActivate){
    routerService.navigate(['/'])
  }
  
  return canActivate;
};
