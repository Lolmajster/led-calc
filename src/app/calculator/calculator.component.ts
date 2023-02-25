import { Component, OnChanges, SimpleChanges, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DataService } from '../services/data.service';
import { Control } from 'src/app/interfaces/my-form.interface';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnChanges {
  @Input() controls: Control[];
  calcForm: FormGroup = this.fb.group({});

  constructor(public fb: FormBuilder, private dataService: DataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['controls'].firstChange) {
      console.log(changes);
      this.createForm(this.controls);
    }
  }

  createForm(controls: Control[]) {
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
              validatorsToAdd.push(Validators.email);
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
    console.log('calcForm.valueChanges: ', this.calcForm.value);
    console.log('this.controls', this.controls);

    // const sum = this.jsonFormData.controls
    //   .map((obj: Control) => obj.price)
    //   .reduce((accumulator: any, current: any) => accumulator + current, 0);
    // console.log(sum);

    //* update controls$ global object by values from calcForm
    for (let key in this.calcForm.value) {
      this.dataService.controls$.subscribe(el => {
        const index = el.findIndex(ele => ele.name === key)
        el[index].qty = +this.calcForm.value[key];
      });
    }

    this.dataService.calculateLampPrice();

  }


}
