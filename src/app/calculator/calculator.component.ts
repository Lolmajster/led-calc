import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  calcForm: FormGroup;

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCalcForm();
  }

  loadCalcForm() {
    this.calcForm = this.fb.group({
      lamp1: [''],
      lamp2: ['']
    });
  }

  submitForm() {
    console.log(this.calcForm.value);
  }
}
