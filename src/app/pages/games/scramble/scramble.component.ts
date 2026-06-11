import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { WORD_SCRAMBLE } from '../../../core/data/app-data';
import { ProgressService } from '../../../core/services/progress.service';
import { normalizeAnswer } from '../../../core/utils/days-together';
import { IconComponent } from '../../../shared/icons/icon.component';

@Component({
  selector: 'app-scramble',
  imports: [PageHeaderComponent, RouterLink, FormsModule, IconComponent],
  template: `
    <app-page-header title="Palavras Embaralhadas" subtitle="Descubra a palavra" backLink="/jogos" />

    @if (!finished()) {
      <div class="card mb-4 text-center">
        <span class="text-xs text-pink-200/60">{{ currentIndex() + 1 }} / {{ words.length }}</span>
      </div>

      <div class="card text-center animate-fade-in">
        <p class="text-pink-200/70 text-sm mb-2">{{ currentWord().hint }}</p>
        <p
          class="font-display text-2xl sm:text-4xl text-white tracking-[0.12em] sm:tracking-[0.3em] break-all mb-6"
        >
          {{ currentWord().scrambled }}
        </p>

        <form (submit)="submit($event)">
          <input
            type="text"
            [(ngModel)]="answer"
            name="answer"
            placeholder="Digite a palavra..."
            class="input-field w-full mb-3 text-center uppercase tracking-widest"
            autocomplete="off"
          />
          @if (error()) {
            <p class="text-red-400 text-sm mb-3">Quase! Tenta outra vez</p>
          }
          <button type="submit" class="btn-primary w-full">Confirmar</button>
        </form>

        <button class="text-pink-300/50 text-xs mt-4" (click)="skip()">Pular palavra</button>
      </div>
    } @else {
      <div class="card text-center animate-fade-in">
        <app-icon name="heart" [size]="56" class="text-rose-400 mx-auto mb-4 block" />
        <h2 class="text-white font-display text-2xl">Parabéns, minha sushimaki!</h2>

        <div class="meme-storm mt-6" aria-hidden="true">
          @for (item of tiaoBurst; track item.id) {
            <figure
              class="meme-box meme-box-pop"
              [style.--meme-rot]="item.rotate + 'deg'"
              [style.--meme-x]="item.x"
              [style.--meme-y]="item.y"
              [style.--meme-delay]="item.delay + 'ms'"
              [style.--meme-scale]="item.scale"
            >
              <img src="/images/tiao1.jpeg" alt="" class="meme-img" />
              <figcaption class="meme-caption">tiao</figcaption>
            </figure>
          }
        </div>

        <button class="btn-primary w-full mt-6" (click)="restart()">Jogar de novo</button>
        <a routerLink="/jogos" class="btn-secondary w-full mt-3 inline-block text-center">Voltar</a>
      </div>
    }
  `,
})
export class ScrambleComponent {
  readonly words = WORD_SCRAMBLE;
  readonly tiaoBurst = [
    { id: 0, rotate: -14, x: '0%', y: '0%', scale: 1, delay: 0 },
    { id: 1, rotate: 10, x: '28%', y: '5%', scale: 0.9, delay: 80 },
    { id: 2, rotate: -8, x: '56%', y: '-2%', scale: 0.85, delay: 160 },
    { id: 3, rotate: 16, x: '12%', y: '38%', scale: 0.95, delay: 240 },
    { id: 4, rotate: -18, x: '40%', y: '32%', scale: 1, delay: 120 },
    { id: 5, rotate: 6, x: '68%', y: '28%', scale: 0.88, delay: 200 },
    { id: 6, rotate: -11, x: '8%', y: '62%', scale: 0.82, delay: 300 },
    { id: 7, rotate: 12, x: '36%', y: '58%', scale: 0.92, delay: 360 },
    { id: 8, rotate: -6, x: '64%', y: '55%', scale: 0.86, delay: 280 },
  ];
  readonly currentIndex = signal(0);
  readonly finished = signal(false);
  readonly error = signal(false);
  answer = '';

  readonly currentWord = computed(() => this.words[this.currentIndex()]);

  constructor(private readonly progress: ProgressService) {}

  submit(event: Event): void {
    event.preventDefault();
    if (normalizeAnswer(this.answer) === normalizeAnswer(this.currentWord().word)) {
      this.error.set(false);
      this.answer = '';
      this.next();
    } else {
      this.error.set(true);
    }
  }

  skip(): void {
    this.answer = '';
    this.error.set(false);
    this.next();
  }

  next(): void {
    if (this.currentIndex() < this.words.length - 1) {
      this.currentIndex.update((i) => i + 1);
    } else {
      this.finished.set(true);
      this.progress.completeScramble();
    }
  }

  restart(): void {
    this.currentIndex.set(0);
    this.finished.set(false);
    this.answer = '';
    this.error.set(false);
  }
}
