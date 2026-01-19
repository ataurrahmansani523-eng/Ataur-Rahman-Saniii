
import React from 'react';
import { IdentityType, SectionContent } from './types';

export const LUXURY_GOLD = '#C5A059';
export const MATTE_BLACK = '#050505';

export const SECTIONS: Record<IdentityType, SectionContent> = {
  [IdentityType.DEVELOPER]: {
    title: 'Executive Software Architect',
    subtitle: 'High-Integrity Digital Engineering',
    description: 'Mastering the art of software development through surgical precision and architectural foresight. I build bespoke digital ecosystems where every line of code serves a strategic purpose, defining the new standard of technical excellence.',
    icon: 'Terminal'
  },
  [IdentityType.SINGER]: {
    title: 'Singer',
    subtitle: '',
    description: 'A realm untouched by the weight of profession. I do not sing for the crowd; I sing for the soul—where resonance finds its truest, most intimate form.',
    icon: 'Music'
  },
  [IdentityType.EXPLORER]: {
    title: 'BEYOND THE HORIZON',
    subtitle: 'Global Vision & Cultural Mastery',
    description: 'The world is a map of opportunities. From the peak of the Himalayas to the luxury of private aviation, every destination is a masterclass in perspective.',
    icon: 'Compass'
  }
};
