import { Component, OnChanges, SimpleChanges, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { JsonFormData, Control } from 'src/app/interfaces/my-form.interface';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnChanges {
  @Input() jsonFormData: JsonFormData;

  calcForm: FormGroup = this.fb.group({});

  constructor(public fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['jsonFormData'].firstChange) {
      console.log(this.jsonFormData.controls);
      this.createForm(this.jsonFormData.controls)
    }
  }

  createForm(controls: Control[]) {
    console.log(controls);
    for (const control of controls) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }



      this.calcForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd))
    }
  }

  submitForm() {
    console.log('calcForm: ', this.calcForm);
    console.log('calcForm.value: ', this.calcForm.value);
    console.log('calcForm.valid', this.calcForm.valid);
    console.log('this.jsonFormData', this.jsonFormData);
  }
}
