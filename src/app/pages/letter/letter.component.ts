import { Component, signal } from '@angular/core';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { LOVE_LETTER, APP_CONFIG } from '../../core/data/app-data';
import { IconComponent } from '../../shared/icons/icon.component';

@Component({
  selector: 'app-letter',
  imports: [PageHeaderComponent, IconComponent],
  template: `
    <app-page-header title="Carta de Amor" [subtitle]="'Para ' + herName" />

    @if (!revealed()) {
      <div class="card text-center py-12">
        <div class="icon-circle-lg mx-auto mb-4">
          <app-icon name="mail" [size]="36" class="text-pink-300" />
        </div>
        <p class="text-pink-100/80 mb-6">Tem uma carta esperando por ti...</p>
        <button class="btn-primary" (click)="reveal()">Abrir carta</button>
      </div>
    } @else {
      <article class="letter-paper card animate-fade-in">
        @for (paragraph of paragraphs; track $index) {
          <p class="text-pink-50/90 leading-relaxed mb-4 last:mb-0 whitespace-pre-line">{{ paragraph }}</p>
        }
      </article>
    }
  `,
})
export class LetterComponent {
  readonly herName = APP_CONFIG.herName;
  readonly paragraphs = LOVE_LETTER.split('\n\n');
  readonly revealed = signal(false);

  reveal(): void {
    this.revealed.set(true);
  }
}
