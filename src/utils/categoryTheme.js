const CORE_IDS = [
  'faith-in-god',
  'love-of-wisdom',
  'service-to-fellowmen',
];

const BEST_LABELS = {
  'builder-and-innovator': 'B',
  'efficient-professional': 'E',
  'social-moral-global': 'S',
  'transformed-lifelong-learner': 'T',
};

const CORE_LABELS = {
  'faith-in-god': 'I',
  'love-of-wisdom': 'II',
  'service-to-fellowmen': 'III',
};

export const isCoreValue = (category) => category.group === 'Core Value';

export const getCategoryLabel = (category) => {
  if (isCoreValue(category)) {
    return CORE_LABELS[category.id] ?? String(CORE_IDS.indexOf(category.id) + 1);
  }

  return BEST_LABELS[category.id] ?? category.title.charAt(0);
};

export const getCategoryTheme = (category) => {
  if (isCoreValue(category)) {
    return {
      accent: '#6B2737',
      accentSoft: 'rgba(107, 39, 55, 0.08)',
      accentLine: 'rgba(107, 39, 55, 0.28)',
      accentTextSoft: 'rgba(107, 39, 55, 0.8)',
    };
  }

  return {
    accent: '#16233F',
    accentAlt: '#B08D57',
    accentSoft: 'rgba(22, 35, 63, 0.07)',
    accentLine: 'rgba(176, 141, 87, 0.34)',
    accentTextSoft: 'rgba(22, 35, 63, 0.84)',
  };
};
