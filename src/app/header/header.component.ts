import { Component, OnInit } from '@angular/core';
import {CurrencyService} from "../currency.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public data!: { [key: string]: number };

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getCurrency('UAH', "USD", "EUR")
      .subscribe(value => this.data = value.rates);
  }
}
