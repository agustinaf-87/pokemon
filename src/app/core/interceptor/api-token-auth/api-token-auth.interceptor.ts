import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth-service/auth.service";

@Injectable()
export class ApiHashAuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  sesionData = this.authService.getDataLocal();

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setParams: {
        ts: this.sesionData.ts ?? "",
        apikey: this.authService.getDataSession() ?? "",
        hash: this.sesionData.hash ?? "",
      },
    });
    return next.handle(request);
  }
}
