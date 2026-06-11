import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_CONFIG } from '../../core/data/app-data';
import { ProgressService } from '../../core/services/progress.service';
import { getDaysTogether } from '../../core/utils/days-together';
import { IconComponent } from '../../shared/icons/icon.component';
import { IconName } from '../../shared/icons/icon.types';

@Component({
  selector: 'app-home',
  imports: [RouterLink, IconComponent],
  template: `
    <section class="home animate-fade-in">
      <article class="hero-card">
        <div class="hero-mesh" aria-hidden="true"></div>
        <div class="relative z-10">
          <span class="section-label">Tempo juntos</span>
          <p class="hero-number tabular-nums">{{ daysTogether }}</p>
          <p class="hero-sublabel">dias</p>
          <p class="hero-date">desde {{ startFormatted }}</p>
        </div>
      </article>

      <div class="bento-row">
        <div class="stat-chip">
          <app-icon name="gamepad-2" [size]="18" class="text-rose-400" />
          <div>
            <p class="stat-value tabular-nums">{{ progress.gamesCompletedCount() }}</p>
            <p class="stat-label">jogos</p>
          </div>
        </div>
        <div class="stat-chip">
          <app-icon name="ticket" [size]="18" class="text-rose-300" />
          <div>
            <p class="stat-value tabular-nums">{{ progress.redeemedCoupons().length }}</p>
            <p class="stat-label">cupons</p>
          </div>
        </div>
      </div>

      <div class="card-modern">
        <div class="flex items-center gap-3 mb-3">
          <div class="icon-badge">
            <app-icon name="music" [size]="18" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-rose-50">Nossa música</p>
          @if (musicError()) {
              <p class="text-xs text-rose-400/50 truncate">adicione em public/music/</p>
            }
          </div>
        </div>
        <audio
          [src]="musicFile"
          controls
          class="audio-modern w-full"
          (error)="musicError.set(true)"
        ></audio>
      </div>

      <p class="section-label mt-2 mb-3">Explorar</p>
      <div class="explore-grid">
        @for (item of quickLinks; track item.route; let i = $index) {
          <a
            [routerLink]="item.route"
            class="explore-tile"
            [class.explore-tile-featured]="i === 0"
          >
            <div class="explore-icon">
              <app-icon [name]="item.icon" [size]="22" />
            </div>
            <span class="explore-label">{{ item.label }}</span>
            <app-icon name="chevron-right" [size]="16" class="explore-arrow" />
          </a>
        }
      </div>
    </section>
  `,
})
export class HomeComponent {
  readonly musicFile = APP_CONFIG.musicFile;
  readonly daysTogether = getDaysTogether(APP_CONFIG.relationshipStart);
  readonly startFormatted = new Date(APP_CONFIG.relationshipStart + 'T12:00:00').toLocaleDateString(
    'pt-BR',
    { day: 'numeric', month: 'short', year: 'numeric' },
  );
  readonly musicError = signal(false);

  readonly quickLinks: { route: string; label: string; icon: IconName }[] = [
    { route: '/historia', label: 'Nossa história', icon: 'book-open' },
    { route: '/galeria', label: 'Galeria', icon: 'camera' },
    { route: '/jogos', label: 'Jogos', icon: 'gamepad-2' },
    { route: '/motivos', label: '10 motivos', icon: 'heart' },
    { route: '/cupons', label: 'Cupons', icon: 'ticket' },
    { route: '/carta', label: 'Carta', icon: 'mail' },
  ];

  constructor(readonly progress: ProgressService) {}
}
