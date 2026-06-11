import { Injectable, signal, computed } from '@angular/core';

const STORAGE_KEY = 'dianamorados-progress';

interface ProgressData {
  introSeen: boolean;
  redeemedCoupons: string[];
  completedGames: string[];
  quizScore: number | null;
  heartsHighScore: number | null;
}

const DEFAULT: ProgressData = {
  introSeen: false,
  redeemedCoupons: [],
  completedGames: [],
  quizScore: null,
  heartsHighScore: null,
};

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly data = signal<ProgressData>(this.load());

  readonly introSeen = computed(() => this.data().introSeen);
  readonly redeemedCoupons = computed(() => this.data().redeemedCoupons);
  readonly completedGames = computed(() => this.data().completedGames);
  readonly quizScore = computed(() => this.data().quizScore);
  readonly heartsHighScore = computed(() => this.data().heartsHighScore);

  readonly gamesCompletedCount = computed(() => this.data().completedGames.length);

  private load(): ProgressData {
    if (typeof localStorage === 'undefined') return { ...DEFAULT };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...DEFAULT, ...JSON.parse(raw) } : { ...DEFAULT };
    } catch {
      return { ...DEFAULT };
    }
  }

  private save(partial: Partial<ProgressData>): void {
    const next = { ...this.data(), ...partial };
    this.data.set(next);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  }

  markIntroSeen(): void {
    this.save({ introSeen: true });
  }

  redeemCoupon(id: string): void {
    const current = this.data().redeemedCoupons;
    if (!current.includes(id)) {
      this.save({ redeemedCoupons: [...current, id] });
    }
  }

  isCouponRedeemed(id: string): boolean {
    return this.data().redeemedCoupons.includes(id);
  }

  completeGame(id: string): void {
    const current = this.data().completedGames;
    if (!current.includes(id)) {
      this.save({ completedGames: [...current, id] });
    }
  }

  isGameCompleted(id: string): boolean {
    return this.data().completedGames.includes(id);
  }

  setQuizScore(score: number): void {
    this.save({ quizScore: score });
    this.completeGame('quiz');
  }

  setHeartsHighScore(score: number): void {
    const current = this.data().heartsHighScore;
    if (current === null || score > current) {
      this.save({ heartsHighScore: score });
    }
    if (score >= 15) {
      this.completeGame('hearts');
    }
  }

  completeScramble(): void {
    this.completeGame('scramble');
  }

  completeProposal(): void {
    this.completeGame('proposal');
  }
}
