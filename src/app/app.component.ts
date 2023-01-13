import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JsonFormData } from 'src/app/interfaces/my-form.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Kalkulator modernizacji oświetlenia';
  public formData: JsonFormData;

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this._http.get('/assets/my-form.json')
      .subscribe((formData: any) => {
        this.formData = formData
      })
  }
}
