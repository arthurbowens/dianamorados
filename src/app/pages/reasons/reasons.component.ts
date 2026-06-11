import { Component, signal } from '@angular/core';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { REASONS, APP_CONFIG } from '../../core/data/app-data';
import { IconComponent } from '../../shared/icons/icon.component';

@Component({
  selector: 'app-reasons',
  imports: [PageHeaderComponent, IconComponent],
  template: `
    <app-page-header
      title="10 Motivos"
      [subtitle]="'Por que eu amo a ' + herName"
      backLink="/home"
    />

    <div class="space-y-3">
      @for (reason of reasons; track $index; let i = $index) {
        <button
          class="reason-card card w-full text-left flex items-start gap-4 transition-all"
          [class.reason-revealed]="revealed().has(i)"
          (click)="toggle(i)"
        >
          <span
            class="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-rose-700 flex items-center justify-center text-sm font-bold text-white"
          >
            {{ i + 1 }}
          </span>
          @if (revealed().has(i)) {
            <p class="text-pink-50/90 text-sm leading-relaxed animate-fade-in">{{ reason }}</p>
          } @else {
            <p class="text-pink-200/50 text-sm flex items-center gap-1.5">
              Toque para revelar
              <app-icon name="heart" [size]="14" class="text-pink-400/50" />
            </p>
          }
        </button>
      }
    </div>

    @if (revealed().size === reasons.length) {
      <div class="card text-center mt-6 animate-fade-in">
        <app-icon name="heart" [size]="32" class="text-pink-400 mx-auto mb-2" />
        <p class="text-white font-medium">E ainda existem infinitos outros motivos...</p>
      </div>
    }
  `,
})
export class ReasonsComponent {
  readonly herName = APP_CONFIG.herName;
  readonly reasons = REASONS;
  readonly revealed = signal(new Set<number>());

  toggle(index: number): void {
    const next = new Set(this.revealed());
    next.add(index);
    this.revealed.set(next);
  }
}
