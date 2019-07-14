import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { IssueService } from "./issue.service";
import { AddIssueComponent } from "./dashboard/add-issue/add-issues.component";
import { FormsModule } from "@angular/forms";
import { UpdateIssueComponent } from "./dashboard/update-issue/update-issue.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddIssueComponent,
    UpdateIssueComponent
  ],
  entryComponents: [AddIssueComponent, UpdateIssueComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule {}
