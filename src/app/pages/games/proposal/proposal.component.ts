import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { ProgressService } from '../../../core/services/progress.service';
import { APP_CONFIG } from '../../../core/data/app-data';
import { IconComponent } from '../../../shared/icons/icon.component';

@Component({
  selector: 'app-proposal',
  imports: [PageHeaderComponent, RouterLink, IconComponent],
  template: `
    @if (!accepted()) {
      <app-page-header title="Quer casar comigo?" subtitle="Pensa bem..." backLink="/jogos" />
      <div class="card text-center proposal-card">
        <app-icon name="gem" [size]="48" class="text-rose-400 mx-auto mb-4 block animate-fade-in" />
        <h2 class="font-display text-2xl sm:text-3xl text-rose-50 leading-snug mb-2">
          Quer casar comigo?
        </h2>
        <p class="text-rose-200/60 text-sm mb-6">{{ herName }}, escolhe com o coração...</p>

        <button class="btn-primary px-10 mb-6" (click)="accept()">Sim!</button>

        <div
          #arena
          class="proposal-arena relative w-full rounded-2xl overflow-hidden"
          (pointermove)="onPointerMove($event)"
        >
          <p class="absolute inset-x-0 top-3 text-xs text-rose-300/40 pointer-events-none">
            Tenta clicar no não...
          </p>
          <button
            #noBtn
            type="button"
            class="proposal-no-btn absolute inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm text-rose-100 bg-rose-950/80 border border-rose-500/40 shadow-lg select-none touch-none"
            [style.left.px]="noLeft()"
            [style.top.px]="noTop()"
            (pointerenter)="flee()"
            (pointerdown)="onNoAttempt($event)"
            (touchstart)="onNoAttempt($event)"
            (click)="onNoAttempt($event)"
          >
            <app-icon name="heart" [size]="18" class="text-rose-400" />
            Não
          </button>
        </div>
      </div>
    } @else {
      <div class="proposal-win fixed inset-0 z-[200] animate-fade-in">
        <div class="proposal-tiao-storm proposal-tiao-storm--fullscreen" aria-hidden="true">
          @for (tiao of tiaoFly; track tiao.id) {
            <figure
              class="proposal-tiao-fly"
              [style.left.%]="tiao.left"
              [style.--tiao-rot]="tiao.rotate + 'deg'"
              [style.--tiao-drift-x]="tiao.driftX"
              [style.--tiao-start-y]="tiao.startY"
              [style.--tiao-end-y]="tiao.endY"
              [style.--tiao-scale]="tiao.scale"
              [style.animation-delay.ms]="tiao.delay"
              [style.animation-duration.s]="tiao.duration"
            >
              <img src="/images/tiao1.jpeg" alt="" class="meme-img" />
              <figcaption class="meme-caption proposal-tiao-caption">tiao</figcaption>
            </figure>
          }
        </div>

        <div class="proposal-win-actions safe-bottom">
          <button class="btn-primary w-full" (click)="restart()">Jogar de novo</button>
          <a routerLink="/jogos" class="btn-secondary w-full mt-3 inline-block text-center">Voltar</a>
        </div>
      </div>
    }
  `,
})
export class ProposalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('arena') private arenaRef?: ElementRef<HTMLElement>;
  @ViewChild('noBtn') private noBtnRef?: ElementRef<HTMLButtonElement>;

  readonly herName = APP_CONFIG.herName;
  readonly accepted = signal(false);
  readonly noLeft = signal(0);
  readonly noTop = signal(48);

  readonly tiaoFly = Array.from({ length: 36 }, (_, id) => ({
    id,
    left: Math.random() * 94,
    rotate: -35 + Math.random() * 70,
    driftX: `${-35 + Math.random() * 70}vw`,
    startY: `${95 + Math.random() * 25}vh`,
    endY: `${-25 - Math.random() * 35}vh`,
    scale: 0.5 + Math.random() * 0.75,
    delay: id * 120 + Math.random() * 2000,
    duration: 3.5 + Math.random() * 4.5,
  }));

  private fleeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly progress: ProgressService) {}

  ngAfterViewInit(): void {
    this.flee();
  }

  ngOnDestroy(): void {
    if (this.fleeTimer) clearTimeout(this.fleeTimer);
  }

  accept(): void {
    this.accepted.set(true);
    this.progress.completeProposal();
  }

  restart(): void {
    this.accepted.set(false);
    setTimeout(() => this.flee(), 0);
  }

  onNoAttempt(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.flee();
  }

  onPointerMove(event: PointerEvent): void {
    if (this.accepted()) return;
    const btn = this.noBtnRef?.nativeElement;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const distance = Math.hypot(event.clientX - cx, event.clientY - cy);

    if (distance < 90) {
      this.flee();
    }
  }

  flee(): void {
    if (this.fleeTimer) return;

    this.fleeTimer = setTimeout(() => {
      this.fleeTimer = null;
    }, 80);

    const arena = this.arenaRef?.nativeElement;
    const btn = this.noBtnRef?.nativeElement;
    if (!arena || !btn) return;

    const maxX = Math.max(8, arena.clientWidth - btn.offsetWidth - 8);
    const maxY = Math.max(8, arena.clientHeight - btn.offsetHeight - 8);

    this.noLeft.set(8 + Math.random() * maxX);
    this.noTop.set(28 + Math.random() * (maxY - 20));
  }
}
