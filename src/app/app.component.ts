import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiDataResponse, Product, ProductsService } from './products.service';
import { CommonModule } from '@angular/common';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  private readonly productsService = inject(ProductsService);
  private readonly cdr = inject(ChangeDetectorRef);

  private subscription: Subscription | null = null;

  public data: ApiDataResponse | null = null;

  constructor() {
    this.getApiData();
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }

  private getApiData(): void {
    this.subscription = this.productsService.getApiData()
      .pipe(
        tap((data: ApiDataResponse) => {
          this.data = data;
          this.cdr.detectChanges();
        })
      ).subscribe();
  }
}
