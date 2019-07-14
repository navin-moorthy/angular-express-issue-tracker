import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { IssueService } from "src/app/issue.service";

@Component({
  selector: "app-update-issue",
  templateUrl: "./update-issue.component.html",
  styleUrls: ["./update-issue.component.css"]
})
export class UpdateIssueComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UpdateIssueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private issueService: IssueService
  ) {}

  issue: any;

  ngOnInit() {
    this.issue = this.data.issue;
  }

  updateIssue(value) {
    this.issueService.updateIssue(value).subscribe(
      data => {
        this.dialogRef.close(`Updated your issue ${data.id}`);
      },
      error => console.log(error)
    );
  }
}
