import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { COUPONS } from '../../core/data/app-data';
import { ProgressService } from '../../core/services/progress.service';
import { IconComponent } from '../../shared/icons/icon.component';

@Component({
  selector: 'app-coupons',
  imports: [PageHeaderComponent, IconComponent],
  template: `
    <app-page-header
      title="Cupons do Amor"
      subtitle="Válidos para usar quando quiser"
      backLink="/home"
    />

    <div class="space-y-4">
      @for (coupon of coupons; track coupon.id) {
        <article
          class="coupon-card card relative overflow-hidden"
          [class.coupon-redeemed]="progress.isCouponRedeemed(coupon.id)"
        >
          <div class="flex items-start gap-4">
            <div class="icon-circle">
              <app-icon [name]="coupon.icon" [size]="24" class="text-pink-300" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-white font-semibold">{{ coupon.title }}</h3>
              <p class="text-pink-100/70 text-sm mt-1">{{ coupon.description }}</p>
            </div>
          </div>

          @if (progress.isCouponRedeemed(coupon.id)) {
            <div class="mt-4 flex items-center gap-2 text-emerald-400 text-sm">
              <app-icon name="check" [size]="16" />
              Resgatado — me cobra quando quiser!
            </div>
          } @else {
            <button class="btn-secondary w-full mt-4" (click)="redeem(coupon.id)">
              Resgatar cupom
            </button>
          }

          @if (progress.isCouponRedeemed(coupon.id)) {
            <div class="coupon-stamp" aria-hidden="true">USADO</div>
          }
        </article>
      }
    </div>
  `,
})
export class CouponsComponent {
  readonly coupons = COUPONS;

  constructor(readonly progress: ProgressService) {}

  redeem(id: string): void {
    this.progress.redeemCoupon(id);
  }
}
