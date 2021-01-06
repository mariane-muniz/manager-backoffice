import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-tab-play-component',
  templateUrl: './project-tab-play.component.html',
  styleUrls: ['./project-tab-play.component.sass']
})
export class ProjectTabPlayComponent implements OnInit {

  public data: any;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first: [null],
      last: [null],
      name: [null],
      contact: [null],
      password: [null],
    });
  }

  public submit(): void {
  }
}
