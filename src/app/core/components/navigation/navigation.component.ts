import { Component } from "@angular/core";
import { NavigationService } from "../../services/navigation-service/navigation.service";
import { AuthService } from "../../services/auth-service/auth.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent {
  showFloatingComponent = false;

  constructor(
    public navigation: NavigationService,
    public authService: AuthService
  ) {}
}
