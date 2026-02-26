/** Raw price entry from the Switcheo API */
export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

/** Normalized token used throughout the app */
export interface Token {
  currency: string;
  price: number;
  icon: string;
}
