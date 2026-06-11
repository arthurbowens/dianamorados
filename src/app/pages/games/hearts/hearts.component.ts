import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { ProgressService } from '../../../core/services/progress.service';
import { IconComponent } from '../../../shared/icons/icon.component';

interface FallingHeart {
  id: number;
  x: number;
  y: number;
  colorClass: string;
  size: number;
}

@Component({
  selector: 'app-hearts',
  imports: [PageHeaderComponent, IconComponent],
  template: `
    <app-page-header title="Pegue os Corações" subtitle="30 segundos!" backLink="/jogos" />

    <div class="card mb-4 flex flex-wrap justify-between items-center gap-x-4 gap-y-2">
      <div>
        <span class="text-white font-bold text-2xl">{{ score() }}</span>
        <span class="text-pink-200/60 text-sm ml-1">pontos</span>
      </div>
      <div>
        <span class="text-white font-bold text-2xl">{{ timeLeft() }}</span>
        <span class="text-pink-200/60 text-sm ml-1">seg</span>
      </div>
      @if (bestScore() !== null) {
        <div class="text-xs text-pink-200/50 w-full sm:w-auto sm:text-right">Recorde: {{ bestScore() }}</div>
      }
    </div>

    @if (!playing() && !gameOver()) {
      <div class="card text-center py-8">
        <app-icon name="heart" [size]="48" class="text-pink-400 mx-auto mb-4 block" />
        <p class="text-pink-100/80 mb-6">Clique nos corações antes que desapareçam!<br />Faça 15+ pontos para completar.</p>
        <button class="btn-primary" (click)="start()">Começar!</button>
      </div>
    }

    @if (gameOver()) {
      <div class="card text-center mb-4 animate-fade-in">
        <app-icon [name]="score() >= 15 ? 'trophy' : 'dumbbell'" [size]="40" class="text-pink-400 mx-auto mb-2 block" />
        <p class="text-white font-semibold text-xl">{{ score() }} pontos!</p>
        <p class="text-pink-200/70 text-sm mt-2">
          {{ score() >= 15 ? 'Incrível! Você tem reflexos de amor!' : 'Tenta de novo, você consegue!' }}
        </p>
        <button class="btn-primary w-full mt-4" (click)="start()">Jogar de novo</button>
      </div>
    }

    @if (playing() || gameOver()) {
      <div
        class="hearts-arena relative rounded-2xl overflow-hidden min-h-[220px] h-[min(400px,52dvh)] w-full"
      >
        @for (heart of hearts(); track heart.id) {
          <button
            class="heart-target absolute transition-opacity"
            [style.left.%]="heart.x"
            [style.top.%]="heart.y"
            (click)="catch(heart.id)"
          >
            <app-icon name="heart" [size]="heart.size" [class]="heart.colorClass" />
          </button>
        }
        @if (hearts().length === 0 && playing()) {
          <p class="absolute inset-0 flex items-center justify-center text-pink-300/30 text-sm">Aguardando corações...</p>
        }
      </div>
    }
  `,
})
export class HeartsComponent implements OnInit, OnDestroy {
  readonly score = signal(0);
  readonly timeLeft = signal(30);
  readonly playing = signal(false);
  readonly gameOver = signal(false);
  readonly hearts = signal<FallingHeart[]>([]);
  readonly bestScore = signal<number | null>(null);

  private spawnId: ReturnType<typeof setInterval> | null = null;
  private tickId: ReturnType<typeof setInterval> | null = null;
  private nextId = 0;
  private readonly colors = ['text-rose-300', 'text-rose-400', 'text-rose-500', 'text-red-400', 'text-pink-400'];

  constructor(private readonly progress: ProgressService) {}

  ngOnInit(): void {
    this.bestScore.set(this.progress.heartsHighScore());
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  start(): void {
    this.cleanup();
    this.score.set(0);
    this.timeLeft.set(30);
    this.hearts.set([]);
    this.playing.set(true);
    this.gameOver.set(false);
    this.nextId = 0;

    this.spawnId = setInterval(() => this.spawn(), 600);
    this.tickId = setInterval(() => this.tick(), 1000);
  }

  catch(id: number): void {
    if (!this.playing()) return;
    this.hearts.update((h) => h.filter((x) => x.id !== id));
    this.score.update((s) => s + 1);
  }

  private spawn(): void {
    if (!this.playing()) return;
    const heart: FallingHeart = {
      id: this.nextId++,
      x: 5 + Math.random() * 80,
      y: 5 + Math.random() * 75,
      colorClass: this.colors[Math.floor(Math.random() * this.colors.length)],
      size: 28 + Math.random() * 16,
    };
    this.hearts.update((h) => [...h, heart]);

    setTimeout(() => {
      this.hearts.update((h) => h.filter((x) => x.id !== heart.id));
    }, 1500);
  }

  private tick(): void {
    this.timeLeft.update((t) => t - 1);
    if (this.timeLeft() <= 0) {
      this.end();
    }
  }

  private end(): void {
    this.cleanup();
    this.playing.set(false);
    this.gameOver.set(true);
    this.hearts.set([]);
    this.progress.setHeartsHighScore(this.score());
    this.bestScore.set(this.progress.heartsHighScore());
  }

  private cleanup(): void {
    if (this.spawnId) clearInterval(this.spawnId);
    if (this.tickId) clearInterval(this.tickId);
    this.spawnId = null;
    this.tickId = null;
  }
}
