import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  title = "Issue-Tracker";

  showWelcome: boolean;

  ngOnInit() {
    /**
     * To display welcome only on home url
     */
    this.router.events.subscribe(value => {
      if (value instanceof NavigationStart) {
        if (value.url === "/") {
          this.showWelcome = true;
        } else {
          this.showWelcome = false;
        }
      }
    });
  }
}
