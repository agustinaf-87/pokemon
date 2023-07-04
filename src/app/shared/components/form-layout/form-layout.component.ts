import { Component, Input } from "@angular/core";

//Remember to declare the inputs in order to re-use the form layout in other components

@Component({
  selector: "app-form-layout",
  templateUrl: "./form-layout.component.html",
  styleUrls: ["./form-layout.component.scss"],
})
export class FormLayoutComponent {
  @Input() header: any;
  @Input() footer: any;
}
