import { Injectable } from '@angular/core';

import { CurrencyType } from "./types/currencyType";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  getCurrency(base: string, ...currenciesToCompare: string[]): Observable<CurrencyType> {
    currenciesToCompare.join(',');

    const header = new HttpHeaders().set("apikey", "VNHinJNelc3hHsGi7hajl7TbaI855WDd");
    const apiUrl = `https://api.apilayer.com/exchangerates_data/latest?symbols=${currenciesToCompare}&base=${base}`;

    return this.http.get<CurrencyType>(apiUrl, {headers: header});
  }

  constructor(
    private http: HttpClient
  ) { }
}
