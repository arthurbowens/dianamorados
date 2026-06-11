import { IconName } from '../../shared/icons/icon.types';

/** Personalize tudo aqui antes de mostrar pra ela! */

export const APP_CONFIG = {
  herName: 'Fernanda',
  yourName: 'Arthur',
  /** Data em que vocês começaram a namorar (YYYY-MM-DD) */
  relationshipStart: '2025-01-04',
  musicTitle: 'Sailor Song',
  musicArtist: 'Gigi Perez',
  musicFile: '/music/Sailor Song - Gigi Perez.mp3',
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
    title: 'Tua família',
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
  elogio: string;
  image: string;
}

const GALLERY_ELOGIOS = [
  'Teu sorriso salva meu dia',
  'Tu é a mais linda que existe',
  'Cada foto nossa é um tesouro',
  'Tu deixa tudo mais bonito',
  'Minha princesinha japonesa',
  'Teu olhar é meu lugar favorito',
  'Tu é perfeita do teu jeito',
  'Não tem ninguém igual a ti',
  'Tu é a melhor coisa que me aconteceu',
  'Contigo tudo fica melhor',
  'Teu abraço conserta qualquer dia ruim',
  'Tu é linda demais',
  'Cada momento contigo é ouro',
  'Tu me inspira todo dia',
  'Teu jeito me deixa bobo',
  'Tu é linda por dentro e por fora',
  'Minha sushimaki favorita',
  'Tu faz meu coração disparar',
  'Tu é tudo que eu queria',
  'Teu riso é a melhor música',
  'Tu é forte demais, amor',
  'Teu carinho salva meu dia',
  'Tu é a razão do meu sorriso',
  'Todo dia contigo é presente',
  'Tu é minha pessoa favorita no mundo',
  'Te amo mais do que consigo falar',
  'Tu é meu amor pra sempre',
];

const GALLERY_PHOTO_COUNT = 27;

export const GALLERY: GalleryItem[] = Array.from({ length: GALLERY_PHOTO_COUNT }, (_, i) => {
  const n = i + 1;
  return {
    id: String(n),
    elogio: GALLERY_ELOGIOS[i],
    image: `/images/foto${n}.jpeg`,
  };
});

export const LOVE_LETTER = `Para Fernanda ❤️

Minha japonesinha,

Se tu ta lendo isso, significa que chegou ao final de uma pequena surpresa que eu preparei com muito carinho. Talvez pareça apenas um site, algumas páginas e algumas linhas de código. Mas, na verdade, cada detalhe foi feito pensando em te fazer sorrir e feliz.

Eu passo meus dias programando, resolvendo problemas e criando coisas. Mas nenhuma criação minha chega perto da melhor coisa que aconteceu na minha vida: te encontrar.

Tu trouxe leveza para os meus dias mais difíceis, transformou momentos simples em memórias que eu quero guardar para sempre e me mostrou que felicidade de verdade está nas pequenas coisas: uma conversa, uma risada, um abraço teu depois de um dia cansativo.

Obrigado por estar ao meu lado. Obrigado pela tua paciência, pelo teu carinho, pelas brincadeiras, pelos momentos que compartilhamos e por fazer eu me sentir amado de uma forma que nunca imaginei.

Eu amo o teu jeito, o teu sorriso, a tua voz, as tuas manias e até aquelas pequenas coisas que talvez tu nem perceba, mas que fazem eu me apaixonar mais um pouquinho todos os dias.

Se eu pudesse te fazer uma promessa hoje, seria essa: continuar escolhendo tu todos os dias. Nos dias fáceis, nos dias difíceis, nos momentos de certeza e nos momentos de dúvida. Porque, entre todas as possibilidades que a vida poderia me dar, tu continua sendo a minha favorita.

Espero que esse seja apenas mais um dos muitos Dias dos Namorados que ainda vamos viver juntos.

Eu te amo mais do que qualquer código conseguiria explicar.

Com todo o meu amor,

Arthur ❤️`;

export const REASONS = [
  'Pelo sorriso mais lindo do mundo que tu tem',
  'Porque tu faz as melhores comidinhas do mundo',
  'Como tu me faz querer ser melhor',
  'Teus abraços que consertam qualquer dia ruim',
  'Pelo esforço na faculdade e no estágio, e mesmo assim tu é carinhosa comigo',
  'Nossas conversas até tarde',
  'Tu lembrar dos detalhes pequenos',
  'Tua força quando as coisas ficam difíceis',
  'Como tudo fica mais leve contigo por perto',
  'Porque contigo, eu encontrei meu lar',
];

export interface Coupon {
  id: string;
  title: string;
  icon: IconName;
}

export const COUPONS: Coupon[] = [
  { id: 'jantar', title: 'Jantar feito por mim', icon: 'utensils' },
  { id: 'massagem', title: 'Massagem de 30 min', icon: 'hand' },
  { id: 'filme', title: 'Filme que tu escolhe', icon: 'film' },
  { id: 'picnic', title: 'Picnic romântico', icon: 'heart' },
  { id: 'sobremesa', title: 'Pudim de sorvete ou sobremesa que tu quiser', icon: 'coffee' },
  { id: 'jogos', title: 'Noite de jogos', icon: 'gamepad-2' },
  { id: 'beijinhos', title: 'Beijinhos', icon: 'heart' },
  { id: 'colinho', title: 'Um dia inteiro só de colinho', icon: 'moon' },
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
    question: 'Onde tu conheceu minha mãe e o Enzo?',
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
    question: 'O que eu mais amo em ti?',
    options: ['Tudo', 'Teu sorriso', 'Tua inteligência', 'Todas as anteriores'],
    correctIndex: 3,
  },
  {
    question: 'Quantas vezes por dia eu penso em ti?',
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
  { word: 'AMOR', hint: 'O que sinto por ti', scrambled: 'ROMA' },
  { word: 'BEIJO', hint: 'O que eu quero te dar agora', scrambled: 'OJEIB' },
  { word: 'FERNANDA', hint: 'O nome da pessoa mais especial', scrambled: 'NADNAFRE' },
  { word: 'SONHO', hint: 'Tu é o meu...', scrambled: 'HONSO' },
  { word: 'FELIZ', hint: 'Como tu me faz', scrambled: 'ZILEF' },
  { word: 'BOKAS', hint: 'Onde tu conheceu minha mãe', scrambled: 'SOKAB' },
  { word: 'NAMORO', hint: 'O que começou em janeiro', scrambled: 'OROMAN' },
  { word: 'JUNTOS', hint: 'Como gosto de estar contigo', scrambled: 'TOSJUN' },
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
    description: 'Quanto tu sabe sobre nós?',
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
  {
    id: 'proposal',
    route: '/jogos/casar',
    title: 'Quer casar comigo?',
    description: 'Só tem uma resposta certa...',
    icon: 'gem',
    color: 'from-rose-400 to-red-600',
  },
];
