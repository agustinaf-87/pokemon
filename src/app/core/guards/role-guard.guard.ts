import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Role } from "../enums/role.enum";
import { AuthService } from "../services/auth-service/auth.service";

export const roleGuard = (next: ActivatedRouteSnapshot) => {
  const roles: Role[] = next.data["roles"];
  const authService = inject(AuthService);
  const logedUser = authService.getTokenData();

  if (roles && roles.length > 0 && logedUser && roles.includes(logedUser.role))
    return true;

  authService.redirectHomePage(logedUser?.role);
  return false;
};
