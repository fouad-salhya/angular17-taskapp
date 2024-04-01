import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from './token.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService)

  req = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${tokenService.getToken()}`)
  })

  return next(req);
};
