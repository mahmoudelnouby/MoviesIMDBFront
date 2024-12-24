import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {


  let token = localStorage.getItem('authToken') || '';
  if(token){
    
    const headers = new HttpHeaders({
      'Authorization': `${token}`, // Include the token
      // 'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*'
    });
    console.log( localStorage.getItem('authToken'));
    const cloned = req.clone({
      setHeaders: {'Authorization': `${token}`}
    })
    console.log(cloned);
  
  return next(cloned);
  } else{
    return next(req);
  }
};