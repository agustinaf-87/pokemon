import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, finalize, timeout, catchError } from "rxjs";
import { LoaderService } from "../services/loader-service/loader.service";
import { NotificationService } from "../services/error-notification/notification.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(
    private loadingService: LoaderService,
    private notificationService: NotificationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next
      .handle(request)
      .pipe(
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests == 0) {
            this.loadingService.setLoading(false);
          }
        })
      )
      .pipe(
        timeout(3000),
        catchError((error) => {
          this.loadingService.setLoading(false);
          this.notificationService.showError(error.message, error.status);
          throw error;
        })
      );
  }
}
