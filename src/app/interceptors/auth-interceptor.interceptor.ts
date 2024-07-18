import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({ setHeaders:{
    'Authorization': 'Bearer ' + sessionStorage.getItem('Bearer Token')
  }});
  return next(newReq);
};
