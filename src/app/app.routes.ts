import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/intro/intro.component').then((m) => m.IntroComponent),
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'home', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
      {
        path: 'historia',
        loadComponent: () => import('./pages/timeline/timeline.component').then((m) => m.TimelineComponent),
      },
      {
        path: 'galeria',
        loadComponent: () => import('./pages/gallery/gallery.component').then((m) => m.GalleryComponent),
      },
      {
        path: 'carta',
        loadComponent: () => import('./pages/letter/letter.component').then((m) => m.LetterComponent),
      },
      {
        path: 'motivos',
        loadComponent: () => import('./pages/reasons/reasons.component').then((m) => m.ReasonsComponent),
      },
      {
        path: 'cupons',
        loadComponent: () => import('./pages/coupons/coupons.component').then((m) => m.CouponsComponent),
      },
      { path: 'mais', loadComponent: () => import('./pages/more/more.component').then((m) => m.MoreComponent) },
      {
        path: 'jogos',
        loadComponent: () => import('./pages/games/games-hub/games-hub.component').then((m) => m.GamesHubComponent),
      },
      {
        path: 'jogos/quiz',
        loadComponent: () => import('./pages/games/quiz/quiz.component').then((m) => m.QuizComponent),
      },
      {
        path: 'jogos/palavras',
        loadComponent: () => import('./pages/games/scramble/scramble.component').then((m) => m.ScrambleComponent),
      },
      {
        path: 'jogos/coracoes',
        loadComponent: () => import('./pages/games/hearts/hearts.component').then((m) => m.HeartsComponent),
      },
      {
        path: 'jogos/casar',
        loadComponent: () => import('./pages/games/proposal/proposal.component').then((m) => m.ProposalComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
