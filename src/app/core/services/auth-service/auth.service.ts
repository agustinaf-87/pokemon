import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";
import { Observable, map } from "rxjs";
import { Role } from "../../enums/role.enum";
import { IToken } from "../../models/IToken/token.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  private userData = {
    username: "",
    password: "",
  };

  login(username: string, password: string): Observable<string> {
    const url = "/api/login/authenticate";

    this.userData.username = username;
    this.userData.password = password;

    return this.http
      .post<string>(url, { username: username, password: password })
      .pipe(
        map((token) => {
          if (token) sessionStorage.setItem("token", token);
          this.startRefreshTokenTimer();
          return token;
        })
      );
  }

  refreshToken(): Observable<string> {
    const url = "/api/login/authenticate";
    return this.http
      .post<string>(url, {
        username: this.userData.username,
        password: this.userData.password,
      })
      .pipe(
        map((token) => {
          if (token) sessionStorage.setItem("token", token);
          this.startRefreshTokenTimer();
          return token;
        })
      );
  }

  getDataSession() {
    return sessionStorage.getItem("token");
  }

  getTokenData(): IToken | null {
    const token = this.getDataSession();
    if (token) {
      const decoded = jwtDecode<IToken>(token);
      return decoded;
    }
    return null;
  }

  logout(): void {
    sessionStorage.removeItem("token");
    this.stopRefreshTokenTimer();
    this.router.navigateByUrl("/");
  }

  public isLoggedIn(): boolean {
    return this.getDataSession() !== null;
  }

  public getOne(username: string, password: string): Observable<string> {
    const url = "/api/login/authenticate";
    return this.http.post<string>(url, {
      username: username,
      password: password,
    });
  }

  public redirectHomePage(role?: Role): void {
    switch (role) {
      case Role.Admin:
        this.router.navigateByUrl("/pokemons");
        break;

      case Role.Tester:
        this.router.navigateByUrl("/pokedex");
        break;

      case Role.Developer:
        this.router.navigateByUrl("/pokemons");
        break;
      default:
        this.router.navigateByUrl("/login");
    }
  }

  //Helpers
  private refreshTokenTimeout?: number;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    // const jwtBase64 = this.userValue!.jwtToken!.split(".")[1];
    // const jwtToken = JSON.parse(atob(jwtBase64));

    const token = this.getTokenData();

    if (!token) return;
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(token.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = window.setTimeout(
      () =>
        this.refreshToken().subscribe((result) => {
          if (result) {
            sessionStorage.setItem("token", result);
            console.log("TokenRefreshed!!!");
          }
        }),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    window.clearInterval(this.refreshTokenTimeout);
  }
}
