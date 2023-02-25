import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ParametersComponent implements OnInit {

  paramsForm: any;

  constructor(
    public calcForm: FormGroupDirective,
    ) { }

  ngOnInit() {
    this.paramsForm = this.calcForm.form;
    this.paramsForm.addControl('parameters', new FormGroup({
      hours: new FormControl(null),
      days: new FormControl("")
    }));
  }
}
