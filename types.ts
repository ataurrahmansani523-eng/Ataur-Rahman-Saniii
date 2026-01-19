
export enum IdentityType {
  DEVELOPER = 'DEVELOPER',
  SINGER = 'SINGER',
  EXPLORER = 'EXPLORER'
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface SectionContent {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}
