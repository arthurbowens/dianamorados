import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG } from '../../core/data/app-data';
import { ProgressService } from '../../core/services/progress.service';
import { IconComponent } from '../../shared/icons/icon.component';

@Component({
  selector: 'app-intro',
  imports: [IconComponent],
  template: `
    <div
      class="intro-screen intro-cinematic min-h-dvh flex flex-col items-center justify-center px-6 text-center relative z-10 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overflow-hidden"
    >
      <div class="intro-stars intro-stars-1" aria-hidden="true"></div>
      <div class="intro-stars intro-stars-2" aria-hidden="true"></div>
      <div class="intro-stars intro-stars-3" aria-hidden="true"></div>

      @if (phase() === 0) {
        <p class="intro-quote font-display text-xl sm:text-2xl text-rose-100/90 leading-relaxed max-w-md">
          {{ displayedText() }}<span class="intro-cursor" [class.intro-cursor-hidden]="typingDone()">|</span>
        </p>
      }

      @if (phase() === 1) {
        <div class="intro-reveal animate-fade-in">
          <p class="section-label intro-reveal-label">Essa pessoa é</p>
          <h1 class="font-display text-5xl md:text-7xl text-rose-50 mt-4 intro-name-glow tracking-tight">
            {{ herName }}
          </h1>
          <button class="btn-primary mt-14 animate-fade-in-up" (click)="nextPhase()">Continuar</button>
        </div>
      }

      @if (phase() === 2) {
        <div class="animate-fade-in max-w-sm relative z-10">
          <div class="icon-circle-lg mx-auto mb-6">
            <app-icon name="mail" [size]="40" class="text-pink-300" />
          </div>
          <p class="text-lg text-rose-200 leading-relaxed font-medium">
            Algo especial foi preparado só pra ti.
          </p>
          <p class="text-rose-400/60 mt-4 text-sm">Dia dos Namorados 2026</p>
          <button class="btn-primary mt-10" (click)="enter()">Entrar no app</button>
        </div>
      }
    </div>
  `,
})
export class IntroComponent implements OnInit, OnDestroy {
  readonly herName = APP_CONFIG.herName;
  readonly phase = signal(0);
  readonly displayedText = signal('');
  readonly typingDone = signal(false);

  private readonly fullQuote = 'Existe uma pessoa que mudou completamente a minha vida...';
  private typeInterval: ReturnType<typeof setInterval> | null = null;
  private revealTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly router: Router,
    private readonly progress: ProgressService,
  ) {}

  ngOnInit(): void {
    if (this.progress.introSeen()) {
      this.router.navigate(['/home']);
      return;
    }
    this.startTypewriter();
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  nextPhase(): void {
    this.phase.set(2);
  }

  enter(): void {
    this.progress.markIntroSeen();
    this.router.navigate(['/home']);
  }

  private startTypewriter(): void {
    let index = 0;
    this.typeInterval = setInterval(() => {
      index++;
      this.displayedText.set(this.fullQuote.slice(0, index));
      if (index >= this.fullQuote.length) {
        if (this.typeInterval) clearInterval(this.typeInterval);
        this.typeInterval = null;
        this.typingDone.set(true);
        this.revealTimer = setTimeout(() => this.phase.set(1), 1800);
      }
    }, 42);
  }

  private clearTimers(): void {
    if (this.typeInterval) clearInterval(this.typeInterval);
    if (this.revealTimer) clearTimeout(this.revealTimer);
  }
}
