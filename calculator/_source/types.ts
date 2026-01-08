export enum Substance {
  MUSHROOMS = 'Champignons',
  LSD = 'LSD',
  MDMA = 'MDMA'
}

export enum MushroomType {
  CUBENSIS_DRIED = 'Psilocybe Cubensis (Secs)',
  CUBENSIS_FRESH = 'Psilocybe Cubensis (Frais)',
  TRUFFLES_FRESH = 'Truffes Magiques (Fraîches)',
  COPELANDIA_DRIED = 'Copelandia Cyanescens (Secs)'
}

export enum DoseLevel {
  MICRO = 'Micro-dose',
  LOW = 'Faible',
  NORMAL = 'Normal',
  HIGH = 'Fort',
  HEROIC = 'Héroïque'
}

export interface CalculationResult {
  level: DoseLevel;
  amount: number; // in grams or micrograms or mg
  unit: string;
  description: string;
}

export interface SafetyAdviceResponse {
  advice: string;
  effects: string[];
  duration: string;
}