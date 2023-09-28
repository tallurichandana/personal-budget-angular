import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private budgetData: any = null;

  constructor(private http: HttpClient) {}

  getBudgetData(): Observable<any> {

    if (this.budgetData) {
      return of(this.budgetData);
    }

    return this.http.get('http://localhost:3000/budget').pipe(

      tap((data) => {
        this.budgetData = data;
      })
    );
  }
}
