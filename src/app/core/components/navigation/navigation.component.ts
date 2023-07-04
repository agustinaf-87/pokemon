import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { NavigationService } from "../../services/navigation-service/navigation.service";
import { AuthService } from "../../services/auth-service/auth.service";
import { SuportedLangs } from "../../enums/suported-langs.enum";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent {
  SuportedLangs = SuportedLangs;
  suportedLangsArray!: string[];
  CurrentLang!: string;

  showFloatingComponent = false;

  constructor(
    public translate: TranslateService,
    public navigation: NavigationService,
    public authService: AuthService
  ) {
    this.suportedLangsArray = Object.values(this.SuportedLangs);
    this.translate.addLangs(this.suportedLangsArray);
    this.loadLangLocal();
  }

  private loadLangLocal(): void {
    if (localStorage.getItem("lang")) {
      this.translate.setDefaultLang(
        localStorage.getItem("lang") ?? this.SuportedLangs.SPANISH
      );
      this.CurrentLang = localStorage.getItem("lang") ?? "";
    } else {
      const navLanguage: string = navigator.language
        .split("-")[0]
        .toLowerCase();

      if (this.suportedLangsArray.includes(navLanguage)) {
        localStorage.setItem("lang", navLanguage);
        this.translate.setDefaultLang(
          localStorage.getItem("lang") ?? SuportedLangs.SPANISH
        );
        this.CurrentLang = localStorage.getItem("lang") ?? "";
      } else {
        this.setLang(this.SuportedLangs.SPANISH);
        this.CurrentLang = this.SuportedLangs.SPANISH;
      }
    }
  }

  public setLang(lang: SuportedLangs) {
    localStorage.setItem("lang", lang);
    this.translate.setDefaultLang(
      localStorage.getItem("lang") ?? SuportedLangs.SPANISH
    );
    this.CurrentLang = lang;
  }

  public langChange(event: any) {
    // event.originalEvent: Browser event
    // event.value: Selected option value
    this.setLang(event.value);
  }
}
