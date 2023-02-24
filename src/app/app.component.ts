import { Component, OnInit } from '@angular/core';

import { DataService } from './services/data.service'
import { Control } from 'src/app/interfaces/my-form.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Kalkulator modernizacji oświetlenia';
  public formData: Control[];
  totalCost: number;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getControls();
    this.dataService.controls$.subscribe((controls: Control[]) => {
      this.formData = controls;
    });
    this.dataService.totalCost$.subscribe(totalCost => this.totalCost = totalCost)
  }
}
