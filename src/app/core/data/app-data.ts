import { IconName } from '../../shared/icons/icon.types';

/** Personalize tudo aqui antes de mostrar pra ela! */

export const APP_CONFIG = {
  herName: 'Fernanda',
  yourName: 'Arthur',
  /** Data em que vocês começaram a namorar (YYYY-MM-DD) */
  relationshipStart: '2025-01-04',
  /** Música de vocês — coloque o arquivo em public/music/nossa-musica.mp3 */
  musicFile: '/music/nossa-musica.mp3',
};

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: IconName;
}

export const TIMELINE: TimelineEvent[] = [
  {
    date: '7 Set 2024',
    title: 'O começo de tudo',
    description:
      'O dia que decidi, de última hora, ir numa festa aleatória da UFSC que eu nunca tinha ouvido falar, porque tava sem nada pra fazer, e conheci a japonesinha do bar, de cara feia e toda mijada.',
    icon: 'sparkles',
  },
  {
    date: '1 Nov 2024',
    title: 'Primeira vez no CSC',
    description:
      'Primeira vez que saímos pro CSC, eu tava muito nervoso kkk. Dormimos juntinhos vendo o pior filme do mundo.',
    icon: 'film',
  },
  {
    date: '27 Dez 2024',
    title: 'Sua família',
    description:
      'Primeira vez que vi tua família, tantos japoneses que fiquei perdido kkkkkkk.',
    icon: 'tree-pine',
  },
  {
    date: '5 Jan 2025',
    title: 'Minha família no Bokas',
    description:
      'Primeira vez que conheceu minha mãe e o Enzo no Bokas, fomos até jogar sinuca depois.',
    icon: 'utensils',
  },
  {
    date: '12 Jun 2025',
    title: 'Nosso primeiro Dia dos Namorados',
    description:
      'Foi um dos melhores dias da minha vida passar esse dia com a mulher da minha vida.',
    icon: 'heart',
  },
  {
    date: 'Jul 2025',
    title: 'Marília e Ribeirão Preto',
    description:
      'Primeira vez que viajamos juntos de avião pra Marília e Ribeirão Preto, foi muito legalll, me diverti muito e fui muito bem recebido pela família e amigos.',
    icon: 'plane',
  },
  {
    date: '4 Jan 2026',
    title: 'Um ano juntos em Gramado',
    description:
      'Nosso primeiro ano juntos viajando pra Gramado, melhor viagem da minha vida junto com minha princesinha japonesa. Foi muito muito bom ir nos restaurantes, neve e passeios por lá juntos.',
    icon: 'tree-pine',
  },
];

export interface GalleryItem {
  id: string;
  caption: string;
  image: string;
}

const GALLERY_CAPTIONS = [
  'Nós dois',
  'Juntos',
  'Minha pessoa',
  'Te amo',
  'Princesinha',
  'Memória guardada',
  'Meu sorriso favorito',
  'Dia perfeito',
  'Com você',
  'Momentos nossos',
];

const GALLERY_PHOTO_COUNT = 27;

/** Edite as legendas em GALLERY_CAPTIONS ou substitua por entradas manuais */
export const GALLERY: GalleryItem[] = Array.from({ length: GALLERY_PHOTO_COUNT }, (_, i) => {
  const n = i + 1;
  return {
    id: String(n),
    caption: GALLERY_CAPTIONS[i % GALLERY_CAPTIONS.length],
    image: `/images/foto${n}.jpeg`,
  };
});

export const LOVE_LETTER = `Minha Fernanda,

Se você está lendo isso, é porque eu passei semanas montando esse cantinho só pra você — e cada linha de código foi escrita pensando no seu sorriso.

Você transformou minha rotina em aventura. Nos dias difíceis, você é meu abrigo. Nos dias bons, você é a razão de eles serem ainda melhores.

Obrigado por rir das minhas piadas ruins, por dividir silêncios confortáveis e por escolher ficar. Eu escolho você todos os dias — hoje, no Dia dos Namorados, e em todos os outros.

Com todo o meu amor,
Arthur`;

export const REASONS = [
  'O jeito que você ri de verdade',
  'Sua paciência comigo (mesmo quando eu mereço bronca)',
  'Como você me faz querer ser melhor',
  'Seus abraços que consertam qualquer dia ruim',
  'A forma como você ouve — de verdade',
  'Nossas conversas até tarde',
  'Você lembrar dos detalhes pequenos',
  'Sua força quando as coisas ficam difíceis',
  'Como tudo fica mais leve com você por perto',
  'Porque com você, eu encontrei meu lar',
];

export interface Coupon {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export const COUPONS: Coupon[] = [
  {
    id: 'jantar',
    title: 'Jantar feito por mim',
    description: 'Você escolhe o cardápio. Eu faço tudo — e lavo a louça.',
    icon: 'utensils',
  },
  {
    id: 'massagem',
    title: 'Massagem de 30 min',
    description: 'Sem pressa, sem celular, só relaxar.',
    icon: 'hand',
  },
  {
    id: 'filme',
    title: 'Filme que você escolhe',
    description: 'Qualquer filme. Eu não reclamo. Prometo.',
    icon: 'film',
  },
  {
    id: 'cafe',
    title: 'Café da manhã na cama',
    description: 'Num domingo de preguiça, com tudo que você gosta.',
    icon: 'croissant',
  },
  {
    id: 'passeio',
    title: 'Passeio surpresa',
    description: 'Eu planejo, você só aparece. Confia em mim.',
    icon: 'flower-2',
  },
  {
    id: 'pedido',
    title: 'Um pedido seu',
    description: 'Qualquer coisa dentro do possível — me surpreenda.',
    icon: 'gift',
  },
];

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: 'Onde foi nosso primeiro encontro?',
    options: ['No parque', 'Num café', 'No cinema', 'Na Insanitaria'],
    correctIndex: 3,
  },
  {
    question: 'Qual é a comida favorita do Arthur que a Fernanda faz?',
    options: ['Pizza', 'Sushi', 'Arroz, feijão e almôndega', 'Hambúrguer'],
    correctIndex: 2,
  },
  {
    question: 'Onde foi a primeira vez que saímos juntos?',
    options: ['No cinema', 'No CSC', 'No Bokas', 'Em Gramado'],
    correctIndex: 1,
  },
  {
    question: 'Onde você conheceu minha mãe e o Enzo?',
    options: ['No CSC', 'Na Insanitaria', 'No Bokas', 'Em Gramado'],
    correctIndex: 2,
  },
  {
    question: 'Para onde viajamos quando completamos um ano juntos?',
    options: ['Rio de Janeiro', 'Gramado', 'São Paulo', 'Curitiba'],
    correctIndex: 1,
  },
  {
    question: 'Qual foi nossa primeira viagem de avião juntos?',
    options: ['Gramado', 'Marília e Ribeirão Preto', 'Rio de Janeiro', 'Buenos Aires'],
    correctIndex: 1,
  },
  {
    question: 'Quando foi nosso primeiro Dia dos Namorados juntos?',
    options: ['12 de junho de 2024', '12 de junho de 2025', '4 de janeiro de 2025', '7 de setembro de 2024'],
    correctIndex: 1,
  },
  {
    question: 'O que eu mais amo em você?',
    options: ['Tudo', 'Seu sorriso', 'Sua inteligência', 'Todas as anteriores'],
    correctIndex: 3,
  },
  {
    question: 'Quantas vezes por dia eu penso em você?',
    options: ['5', '20', '100', 'Perdi a conta'],
    correctIndex: 3,
  },
];

export interface WordScrambleItem {
  word: string;
  hint: string;
  scrambled: string;
}

export const WORD_SCRAMBLE: WordScrambleItem[] = [
  { word: 'AMOR', hint: 'O que sinto por você', scrambled: 'ROMA' },
  { word: 'BEIJO', hint: 'O que eu quero te dar agora', scrambled: 'OJEIB' },
  { word: 'FERNANDA', hint: 'O nome da pessoa mais especial', scrambled: 'NADNAFRE' },
  { word: 'SONHO', hint: 'Você é o meu...', scrambled: 'HONSO' },
  { word: 'FELIZ', hint: 'Como você me faz', scrambled: 'ZILEF' },
  { word: 'BOKAS', hint: 'Onde você conheceu minha mãe', scrambled: 'SOKAB' },
  { word: 'NAMORO', hint: 'O que começou em janeiro', scrambled: 'OROMAN' },
  { word: 'JUNTOS', hint: 'Como gosto de estar com você', scrambled: 'TOSJUN' },
  { word: 'SEMPRE', hint: 'Eu te escolho...', scrambled: 'MESPRE' },
  { word: 'SASHIMI', hint: 'O que tu é, minha?', scrambled: 'IMSASHI' },
  { word: 'MARILIA', hint: 'Primeira viagem de avião', scrambled: 'AIRLAMI' },
  { word: 'JANEIRO', hint: 'Mês que começamos a namorar', scrambled: 'OEIRANJ' },
  { word: 'JAPONESA', hint: 'Minha princesinha...', scrambled: 'NESAJPOA' },
  { word: 'SAUDADE', hint: 'Quando ficamos longe', scrambled: 'DEASUDA' },
];

export const GAME_INFO: {
  id: string;
  route: string;
  title: string;
  description: string;
  icon: IconName;
  color: string;
}[] = [
  {
    id: 'quiz',
    route: '/jogos/quiz',
    title: 'Quiz do Amor',
    description: 'Quanto você sabe sobre nós?',
    icon: 'lightbulb',
    color: 'from-rose-400 to-rose-600',
  },
  {
    id: 'scramble',
    route: '/jogos/palavras',
    title: 'Palavras Embaralhadas',
    description: 'Descubra as palavras do coração',
    icon: 'type',
    color: 'from-pink-400 to-rose-700',
  },
  {
    id: 'hearts',
    route: '/jogos/coracoes',
    title: 'Pegue os Corações',
    description: 'Clique nos corações antes que sumam!',
    icon: 'heart',
    color: 'from-rose-500 to-red-700',
  },
];
