import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

export interface Product {
  brand: string;
  name: string;
  description: string;
  images: string[],
  prices: {
    price: string;
    available: number;
    size?: string;
  }[],
  note?: string;
}

type ProductsResponse = { products: Product[] };

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);

  public getProducts(): Observable<Product[]> {
    return this.http.get<ProductsResponse>('/assets/products/products.json')
      .pipe(map(({ products }) => products ));
  }
}
