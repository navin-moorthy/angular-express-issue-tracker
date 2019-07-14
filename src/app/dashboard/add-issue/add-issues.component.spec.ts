import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIssuesComponent } from './add-issues.component';

describe('AddIssuesComponent', () => {
  let component: AddIssuesComponent;
  let fixture: ComponentFixture<AddIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
