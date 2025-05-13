import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

export interface Product {
  title: string;
  description: string;
}

export type ProductsResponse = { products: Product[] };

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);

  public getProducts(): Observable<Product[]> {
    return this.http.get<ProductsResponse>('/assets/products.json')
      .pipe(map(({ products }) => products ));
  }
}
