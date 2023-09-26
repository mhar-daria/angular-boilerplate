import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { LocalstorageService } from '../localstorage.service';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

    constructor(private storageService: LocalstorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.storageService.check('token')) {
            return next.handle(request)
        }

        const token = this.storageService.get('token')
        const cloneRequest = request.clone({
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                Accept: 'application/json',
            })
        })

        return next.handle(cloneRequest)
    }
}
