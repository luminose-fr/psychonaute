import { DoseLevel, MushroomType, Substance } from "./types";

// Factors are roughly grams per kg of body weight
export const MUSHROOM_FACTORS: Record<MushroomType, Record<DoseLevel, number>> = {
  [MushroomType.CUBENSIS_DRIED]: {
    [DoseLevel.MICRO]: 0.003,
    [DoseLevel.LOW]: 0.015,
    [DoseLevel.NORMAL]: 0.03,
    [DoseLevel.HIGH]: 0.05,
    [DoseLevel.HEROIC]: 0.07,
  },
  [MushroomType.CUBENSIS_FRESH]: {
    [DoseLevel.MICRO]: 0.03,
    [DoseLevel.LOW]: 0.15,
    [DoseLevel.NORMAL]: 0.3,
    [DoseLevel.HIGH]: 0.5,
    [DoseLevel.HEROIC]: 0.7,
  },
  [MushroomType.TRUFFLES_FRESH]: {
    [DoseLevel.MICRO]: 0.07,
    [DoseLevel.LOW]: 0.13, // Truffles scale differently
    [DoseLevel.NORMAL]: 0.20,
    [DoseLevel.HIGH]: 0.35,
    [DoseLevel.HEROIC]: 0.6,
  },
  [MushroomType.COPELANDIA_DRIED]: {
    [DoseLevel.MICRO]: 0.001,
    [DoseLevel.LOW]: 0.005,
    [DoseLevel.NORMAL]: 0.01,
    [DoseLevel.HIGH]: 0.018,
    [DoseLevel.HEROIC]: 0.025,
  }
};

// Fixed dosages for LSD in micrograms (ug) - Weight is less of a factor
export const LSD_TIERS: Record<DoseLevel, { min: number; max: number; desc: string }> = {
  [DoseLevel.MICRO]: { min: 10, max: 20, desc: "Sub-perceptuel. Augmentation de la créativité et de l'énergie." },
  [DoseLevel.LOW]: { min: 25, max: 75, desc: "Effets légers. Euphorie, légers visuels, pensée altérée." },
  [DoseLevel.NORMAL]: { min: 80, max: 150, desc: "Trip complet. Visuels géométriques, distorsion du temps." },
  [DoseLevel.HIGH]: { min: 150, max: 300, desc: "Intense. Visuels forts, confusion possible, dissolution de l'ego." },
  [DoseLevel.HEROIC]: { min: 300, max: 1000, desc: "Extrême. Perte de contact totale avec la réalité. Experts uniquement." }
};

// MDMA factors (mg per kg)
export const MDMA_FACTOR = 1.5; // Common harm reduction guideline: 1.5mg/kg
export const MDMA_MAX_SAFE = 120; // Hard cap for harm reduction

// Static Safety Data replacing Gemini
export const STATIC_SAFETY_DATA: Record<Substance, { effects: string[], advice: string, duration: string }> = {
  [Substance.MUSHROOMS]: {
    effects: ["Euphorie", "Pensée visuelle", "Connexion à la nature", "Distorsion du temps", "Rires"],
    advice: "Le 'Set & Setting' est crucial. Choisissez un environnement calme et familier. Ayez un trip sitter de confiance si possible. Ne combattez pas l'expérience, laissez-vous porter.",
    duration: "4 - 6 heures (Afterglow jusqu'à 24h)"
  },
  [Substance.LSD]: {
    effects: ["Énergie", "Visuels complexes", "Créativité", "Synesthésie", "Pensée analytique"],
    advice: "La durée est très longue (jusqu'à 12h). Prévoyez votre journée et le lendemain pour vous reposer. Testez toujours vos produits. L'hydratation est importante, mais sans excès.",
    duration: "8 - 12 heures"
  },
  [Substance.MDMA]: {
    effects: ["Empathie intense", "Énergie physique", "Euphorie", "Sensations tactiles", "Suppression de la peur"],
    advice: "Attention à l'hyperthermie : faites des pauses si vous dansez. Hydratez-vous (250ml-500ml par heure max). Ne mélangez pas avec d'autres substances ou alcool. Attendez 6-8 semaines entre les prises.",
    duration: "3 - 6 heures"
  }
};