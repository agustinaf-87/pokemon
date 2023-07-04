import { Router } from "@angular/router";
import { AuthService } from "../services/auth-service/auth.service";
import { inject } from "@angular/core";
import { NotificationService } from "../services/error-notification/notification.service";

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const notService = inject(NotificationService);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    notService.showWarning("Please login to continue");
    router.navigate(["/login"]);
    return false;
  }
};
