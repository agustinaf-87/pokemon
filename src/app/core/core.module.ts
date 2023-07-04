import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { NavigationService } from "./services/navigation-service/navigation.service";
import { SharedModule } from "../shared/shared.module";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LandingPageComponent } from "../core/pages/landing-page/landing-page.component";
import { CoreRoutingModule } from "./core-routing.module";

@NgModule({
  declarations: [
    NavigationComponent,
    SpinnerComponent,
    LoginComponent,
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [NavigationService],
  exports: [NavigationComponent, SpinnerComponent, LoginComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    this.throwIfAlreadyLoaded(parentModule, `CoreModule`);
  }

  throwIfAlreadyLoaded(parentModule: CoreModule, moduleName: string) {
    if (parentModule) {
      throw new Error(
        `${moduleName} has already been loaded. Import core module in the app module only.`
      );
    }
  }
}
