import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CurrencyService} from "../currency.service";
@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
   allInputsControl!: FormGroup;
   currentRate!: number;

   onChangeFirstInput(event: any) {
     const newValue = (this.currentRate * event.target.value).toFixed(2);
     this.allInputsControl.patchValue({secondAmount: newValue})
   }

  onChangeSecondInput(event: any) {
    const newValue = (event.target.value / this.currentRate).toFixed(2);
    this.allInputsControl.patchValue({firstAmount: newValue})
  }

  onChangeCurrency() {
    const firstCurrency: string = this.allInputsControl.value.firstCurrency;
    const secondCurrency: string = this.allInputsControl.value.secondCurrency;
    const firstAmount: string = this.allInputsControl.value.firstAmount;
    let newSecondAmount: number = 0;

    this.currencyService.getCurrency(firstCurrency, secondCurrency)
      .subscribe(value => {
        this.currentRate = value.rates[secondCurrency];
        newSecondAmount = +(this.currentRate * +firstAmount).toFixed(2);

        this.allInputsControl.patchValue({secondAmount: newSecondAmount})
      });
  }

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getCurrency('UAH', "EUR")
      .subscribe(value => {
        this.currentRate = +(value.rates['EUR']).toFixed(2)
        this.allInputsControl.patchValue({secondAmount: this.currentRate})
      });

    this.allInputsControl = new FormGroup({
      firstAmount: new FormControl(1),
      firstCurrency: new FormControl('UAH'),
      secondAmount: new FormControl(),
      secondCurrency: new FormControl('EUR'),
    });
  }

}
