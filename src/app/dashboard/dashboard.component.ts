import { Component, OnInit } from "@angular/core";
import { IssueService } from "../issue.service";
import { MatDialog, MatSnackBar } from "@angular/material";

import { AddIssueComponent } from "./add-issue/add-issues.component";
import { UpdateIssueComponent } from "./update-issue/update-issue.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private issueService: IssueService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  issues: any = [];
  defaultStatusFilter = "all";
  defaultSeverityFilter = "all";
  showHideCustomize = [
    "showDateCreated",
    "showSeverity",
    "showDetails",
    "showResolutionDate",
    "showStatus",
    "showShortDescription"
  ];
  isLoading = false;

  ngOnInit() {
    /**
     * Get the Issues on component Initialization
     */
    this.isLoading = true;
    this.issueService.getIssues().subscribe(
      issues => {
        issues.forEach(issue => {
          this.issues.push(issue);
        });
      },
      err => console.log(err)
    );
    this.isLoading = false;
  }

  /**
   * ADD, UPDATE and DELETE Operations
   */

  /**
   * Add new issue
   */
  addIssue() {
    const addIssueDialog = this.dialog.open(AddIssueComponent, {
      width: "100vh"
    });

    /**
     * Open AddIssue Dialog and refresh the issues on submission
     */
    addIssueDialog.afterClosed().subscribe(message => {
      if (message) {
        this.snackBar.open(message, "", {
          duration: 2000
        });
        this.issues = [];
        this.isLoading = true;
        this.issueService.getIssues().subscribe(
          issues => {
            issues.forEach(issue => {
              this.issues.push(issue);
            });
            this.isLoading = false;
          },
          err => console.log(err)
        );
      } else {
        this.snackBar.open(`Closed without adding an Issue`, "", {
          duration: 2000
        });
      }
    });
  }

  /**
   * Update an issue
   */
  updateIssue(event) {
    let issueIdToBeUpdated: number;

    if (event.target.className === "mat-button-wrapper") {
      issueIdToBeUpdated = parseInt(
        event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1]
          .firstChild.firstChild.firstChild.textContent,
        10
      );
    } else if (event.target.classList[0] === "mat-icon") {
      issueIdToBeUpdated = parseInt(
        event.target.parentNode.parentNode.parentNode.parentNode.parentNode
          .childNodes[1].firstChild.firstChild.firstChild.textContent,
        10
      );
    } else {
      issueIdToBeUpdated = parseInt(
        event.target.parentNode.parentNode.parentNode.childNodes[1].firstChild
          .firstChild.firstChild.textContent,
        10
      );
    }

    /**
     * Open UpdateIssue Dialog and refresh the issues on submission
     */
    this.issues.forEach(issue => {
      if (issue.id === issueIdToBeUpdated) {
        const updateIssueDialog = this.dialog.open(UpdateIssueComponent, {
          data: { issue },
          width: "100vh"
        });

        updateIssueDialog.afterClosed().subscribe(message => {
          if (message) {
            this.snackBar.open(message, "", {
              duration: 2000
            });
            this.issues = [];
            this.isLoading = true;
            this.issueService.getIssues().subscribe(
              issues => {
                issues.forEach(iss => {
                  this.issues.push(iss);
                });
                this.isLoading = false;
              },
              err => console.log(err)
            );
          } else {
            this.snackBar.open(`Closed without updating the Issue`, "", {
              duration: 2000
            });
          }
        });
      }
    });
  }

  /**
   * Delete an issue
   */
  deleteIssue(event) {
    let issueIdToBeDeleted: number;

    if (event.target.className === "mat-button-wrapper") {
      issueIdToBeDeleted = parseInt(
        event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1]
          .firstChild.firstChild.firstChild.textContent,
        10
      );
    } else if (event.target.classList[0] === "mat-icon") {
      issueIdToBeDeleted = parseInt(
        event.target.parentNode.parentNode.parentNode.parentNode.parentNode
          .childNodes[1].firstChild.firstChild.firstChild.textContent,
        10
      );
    } else {
      issueIdToBeDeleted = parseInt(
        event.target.parentNode.parentNode.parentNode.childNodes[1].firstChild
          .firstChild.firstChild.textContent,
        10
      );
    }

    /**
     * Delete the issue and refresh the issues if successfull
     */
    this.issueService.deleteIssue(issueIdToBeDeleted).subscribe(
      issues => {
        this.snackBar.open(`Issue ${issueIdToBeDeleted} Deleted`, "", {
          duration: 2000
        });
        this.issues = [];
        this.isLoading = true;
        issues.forEach(issue => {
          this.issues.push(issue);
        });
        this.isLoading = false;
      },
      error => console.log(error)
    );
  }
}
