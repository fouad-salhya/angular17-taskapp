import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const afterAuthGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService)
  const router = inject(Router)

  if(tokenService.isValid()) {
    router.navigate(['../'])
    return false
  }
    return true;
};
