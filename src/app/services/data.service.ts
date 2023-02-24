import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonFormData, Control } from 'src/app/interfaces/my-form.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  controls: Control[] = [];

  constructor(private _http: HttpClient) {}

  getControls() {
    return this._http.get<JsonFormData>('/assets/my-form.json')
  }
}
