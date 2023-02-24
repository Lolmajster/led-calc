import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service'

import { JsonFormData } from 'src/app/interfaces/my-form.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Kalkulator modernizacji oświetlenia';
  public formData: JsonFormData;

  constructor(private _http: HttpClient, private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getControls().subscribe((formData: JsonFormData) => {this.formData = formData})
  }
}
