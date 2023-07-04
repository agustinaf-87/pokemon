import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-service/auth.service";
import { NotificationService } from "../../services/error-notification/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
      }
      // {
      //   updateOn: "submit",
      //   asyncValidators: [this.loginCorrect.validate.bind(this.loginCorrect)],
      //   validators: [Validators.required],
      // }
    );
  }

  login(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get("username")?.value;
      const password = this.loginForm.get("password")?.value;
      this.authService.login(username, password).subscribe((data) => {
        if (data) {
          this.notificationService.showSuccess("Login successful!");
          this.router.navigateByUrl("/pokemons");
        } else {
          this.notificationService.showError("Please enter valid credentials");
        }
      });
    }
  }
}
