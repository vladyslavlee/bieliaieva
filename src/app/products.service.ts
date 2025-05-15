import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Product {
  brand: string;
  name: string;
  description: string;
  images: string[],
  available: {
    price: number;
    newPrice?: number;
    count: number;
    newCount?: number;
    size?: string;
  }[];
  note?: string;
}

export type ApiDataResponse = {
  currency: string;
  products: Product[];
};

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);

  public getApiData(): Observable<ApiDataResponse> {
    return this.http.get<ApiDataResponse>('/assets/products/products.json');
  }
}
