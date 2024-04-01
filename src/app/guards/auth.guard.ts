import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';




export const authGuard: CanActivateFn = (route, state) => {

   const tokenService = inject(TokenService)
   const router = inject(Router)
   const accountService = inject(AccountService)

   if(!tokenService.loggedIn()) {
      tokenService.remove()
      accountService.changeStatus(false)
      router.navigate(['/signin'])
      return false
   }

      return true;
};
