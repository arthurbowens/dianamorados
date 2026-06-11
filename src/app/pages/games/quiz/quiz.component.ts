import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { QUIZ_QUESTIONS } from '../../../core/data/app-data';
import { ProgressService } from '../../../core/services/progress.service';
import { IconComponent } from '../../../shared/icons/icon.component';
import { IconName } from '../../../shared/icons/icon.types';

@Component({
  selector: 'app-quiz',
  imports: [PageHeaderComponent, RouterLink, IconComponent],
  template: `
    <app-page-header title="Quiz do Amor" subtitle="Quanto tu sabe sobre nós?" backLink="/jogos" />

    @if (!finished()) {
      <div class="card mb-4">
        <div class="flex justify-between text-xs text-pink-200/60 mb-2">
          <span>Pergunta {{ currentIndex() + 1 }} de {{ questions.length }}</span>
          <span class="inline-flex items-center gap-1">
            <app-icon name="star" [size]="12" class="text-amber-400" />
            {{ score() }} pts
          </span>
        </div>
        <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-rose-400 to-rose-700 transition-all duration-300"
            [style.width.%]="((currentIndex() + 1) / questions.length) * 100"
          ></div>
        </div>
      </div>

      <div class="card animate-fade-in">
        <h2 class="text-white text-lg font-medium leading-snug">{{ currentQuestion().question }}</h2>

        <div class="space-y-2 mt-6">
          @for (option of currentQuestion().options; track option; let i = $index) {
            <button
              class="quiz-option w-full text-left px-4 py-3 rounded-xl border transition-all text-sm"
              [class.option-correct]="answered() && i === currentQuestion().correctIndex"
              [class.option-wrong]="answered() && selected() === i && i !== currentQuestion().correctIndex"
              [class.option-default]="!answered()"
              [disabled]="answered()"
              (click)="select(i)"
            >
              {{ option }}
            </button>
          }
        </div>

        @if (answered()) {
          <p
            class="text-sm font-semibold mt-4 animate-fade-in"
            [class.text-emerald-400]="isCorrect()"
            [class.text-red-400]="!isCorrect()"
          >
            {{ isCorrect() ? 'Certo!' : 'Errado!' }}
          </p>
          <button class="btn-primary w-full mt-4" (click)="next()">
            {{ currentIndex() < questions.length - 1 ? 'Próxima' : 'Ver resultado' }}
          </button>
        }
      </div>
    } @else {
      <div class="card text-center animate-fade-in">
        <app-icon [name]="resultIcon()" [size]="56" class="text-pink-400 mx-auto mb-4" />
        <h2 class="text-white font-display text-3xl">{{ score() }} / {{ questions.length }}</h2>
        <p class="text-pink-100/80 mt-4">{{ resultMessage() }}</p>
        <button class="btn-primary w-full mt-6" (click)="restart()">Jogar de novo</button>
        <a routerLink="/jogos" class="btn-secondary w-full mt-3 inline-block text-center">Voltar aos jogos</a>
      </div>
    }
  `,
})
export class QuizComponent {
  readonly questions = QUIZ_QUESTIONS;
  readonly currentIndex = signal(0);
  readonly score = signal(0);
  readonly selected = signal<number | null>(null);
  readonly answered = signal(false);
  readonly finished = signal(false);

  readonly currentQuestion = computed(() => this.questions[this.currentIndex()]);

  readonly isCorrect = computed(
    () => this.answered() && this.selected() === this.currentQuestion().correctIndex,
  );

  constructor(private readonly progress: ProgressService) {}

  select(index: number): void {
    if (this.answered()) return;
    this.selected.set(index);
    this.answered.set(true);
    if (index === this.currentQuestion().correctIndex) {
      this.score.update((s) => s + 1);
    }
  }

  next(): void {
    if (this.currentIndex() < this.questions.length - 1) {
      this.currentIndex.update((i) => i + 1);
      this.selected.set(null);
      this.answered.set(false);
    } else {
      this.finished.set(true);
      this.progress.setQuizScore(this.score());
    }
  }

  restart(): void {
    this.currentIndex.set(0);
    this.score.set(0);
    this.selected.set(null);
    this.answered.set(false);
    this.finished.set(false);
  }

  resultIcon(): IconName {
    const ratio = this.score() / this.questions.length;
    if (ratio === 1) return 'trophy';
    if (ratio >= 0.8) return 'heart';
    if (ratio >= 0.5) return 'smile';
    return 'dumbbell';
  }

  resultMessage(): string {
    const ratio = this.score() / this.questions.length;
    if (ratio === 1) return 'Perfeita! Tu conhece cada detalhe do nosso amor!';
    if (ratio >= 0.8) return 'Incrível! Tu sabe quase tudo sobre nós!';
    if (ratio >= 0.5) return 'Boa! Mas ainda tem histórias pra descobrir juntos.';
    return 'Haha, acho que alguém precisa prestar mais atenção no namorado! Brincadeira, te amo!';
  }
}
