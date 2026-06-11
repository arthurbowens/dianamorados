import { Component, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG } from '../../core/data/app-data';
import { ProgressService } from '../../core/services/progress.service';
import { IconComponent } from '../../shared/icons/icon.component';

@Component({
  selector: 'app-intro',
  imports: [IconComponent],
  template: `
    <div
      class="intro-screen min-h-dvh flex flex-col items-center justify-center px-6 text-center relative z-10 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
    >
      <div class="floating-decor" aria-hidden="true"></div>

      @if (phase() === 0) {
        <p class="section-label animate-fade-in">Uma surpresa para</p>
        <h1 class="font-display text-5xl md:text-6xl text-white mt-3 animate-fade-in-up tracking-tight">
          {{ herName }}
        </h1>
        <button class="btn-primary mt-12 animate-fade-in-up" (click)="nextPhase()">
          Continuar
        </button>
      }

      @if (phase() === 1) {
        <div class="animate-fade-in max-w-sm">
          <div class="icon-circle-lg mx-auto mb-6">
            <app-icon name="mail" [size]="40" class="text-pink-300" />
          </div>
          <p class="text-lg text-rose-200 leading-relaxed font-medium">
            Algo especial foi preparado só para você.
          </p>
          <p class="text-rose-400/60 mt-4 text-sm">Dia dos Namorados 2026</p>
          <button class="btn-primary mt-10" (click)="enter()">Entrar no app</button>
        </div>
      }
    </div>
  `,
})
export class IntroComponent implements OnInit {
  readonly herName = APP_CONFIG.herName;
  readonly phase = signal(0);

  constructor(
    private readonly router: Router,
    private readonly progress: ProgressService,
  ) {}

  ngOnInit(): void {
    if (this.progress.introSeen()) {
      this.router.navigate(['/home']);
    }
  }

  nextPhase(): void {
    this.phase.set(1);
  }

  enter(): void {
    this.progress.markIntroSeen();
    this.router.navigate(['/home']);
  }
}
