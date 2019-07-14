import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { FormControl } from "@angular/forms";

import { IssueService } from "src/app/issue.service";

@Component({
  selector: "app-add-issues",
  templateUrl: "./add-issues.component.html",
  styleUrls: ["./add-issues.component.css"]
})
export class AddIssueComponent {
  date = new FormControl(new Date());
  issueId = new Date().getTime();
  dateCreated = this.date.value;
  resolutionDate = this.date.value;
  status: string;
  severity: string;
  shortDescription: string;
  details: string;

  constructor(
    public dialogRef: MatDialogRef<AddIssueComponent>,
    private issueService: IssueService
  ) {}

  addNewIssue(value) {
    this.issueService.addIssue(value).subscribe(
      data => {
        this.dialogRef.close(`Submitted your issue ${data.id}`);
      },
      error => console.log(error)
    );
  }
}
