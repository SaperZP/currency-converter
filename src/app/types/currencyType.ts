export interface CurrencyType {
  "base": string;
  "date": string;
  "rates": {
    [key: string] : number
  }
  "success": boolean;
  "timestamp": number;
}
