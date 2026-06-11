import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { GAME_INFO } from '../../../core/data/app-data';
import { ProgressService } from '../../../core/services/progress.service';
import { IconComponent } from '../../../shared/icons/icon.component';

@Component({
  selector: 'app-games-hub',
  imports: [PageHeaderComponent, RouterLink, IconComponent],
  template: `
    <app-page-header
      title="Jogos do Amor"
      subtitle="Diversão feita só pra você"
    />

    <div class="space-y-3">
      @for (game of games; track game.id) {
        <a [routerLink]="game.route" class="game-card card flex items-center gap-4 py-4 group">
          <div
            class="w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg text-white"
            [class]="game.color"
          >
            <app-icon [name]="game.icon" [size]="26" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="text-white font-semibold">{{ game.title }}</h3>
              @if (progress.isGameCompleted(game.id)) {
                <span class="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <app-icon name="check" [size]="12" />
                </span>
              }
            </div>
            <p class="text-pink-200/60 text-sm">{{ game.description }}</p>
          </div>
          <app-icon name="chevron-right" [size]="18" class="text-pink-300/40 group-hover:text-pink-300 transition-colors" />
        </a>
      }
    </div>

    <div class="card mt-6 text-center">
      <p class="text-pink-200/70 text-sm">
        Complete todos os jogos e descubra o quanto você é especial!
      </p>
      <p class="text-white font-display text-2xl mt-2">
        {{ progress.gamesCompletedCount() }} / {{ games.length }}
      </p>
    </div>
  `,
})
export class GamesHubComponent {
  readonly games = GAME_INFO;

  constructor(readonly progress: ProgressService) {}
}
