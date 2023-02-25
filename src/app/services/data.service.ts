import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonFormData, Control } from 'src/app/interfaces/my-form.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private controlsSubject = new BehaviorSubject<Control[]>([]);
  controls$: Observable<Control[]> = this.controlsSubject.asObservable();

  private totalCostSubject = new BehaviorSubject<number>(0);
  totalCost$: Observable<number> = this.totalCostSubject.asObservable();

  constructor(private _http: HttpClient) {}

  getControls() {
    this._http.get<JsonFormData>('/assets/my-form.json').subscribe((response) => {
      this.controlsSubject.next(response.lamps);
    })
  }

  calculateLampPrice() {
    this.controls$.subscribe((controls: Control[]) => {
      for(let ele of controls) {
        console.log(ele)
        ele.totalCost = ele.price * ele.qty;
      }
    });
    this.calculateTotalCost()
  }

  calculateTotalCost() {
    this.controls$.subscribe((controls) => {
      const total = controls
        .map((obj: Control) => obj.totalCost)
        .reduce((accumulator: any, current: any) => accumulator + current, 0);
      this.totalCostSubject.next(total);
    });
  }
}
