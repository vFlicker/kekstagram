export const EffectName = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

export const SliderSetting = {
  chrome: {
    range: {
      max: 1,
      min: 0,
    },
    start: 0.8,
    step: 0.1,
  },
  sepia: {
    range: {
      max: 1,
      min: 0,
    },
    start: 0.8,
    step: 0.1,
  },
  marvin: {
    range: {
      max: 100,
      min: 0,
    },
    start: 80,
    step: 1,
  },
  phobos: {
    range: {
      max: 3,
      min: 0,
    },
    start: 2.4,
    step: 0.1,
  },
  heat: {
    range: {
      max: 3,
      min: 1,
    },
    start: 2.6,
    step: 0.1,
  },
};

export const SortType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

export const SuccessHTTPSStatusRange = {
  MIN: 200,
  MAX: 299,
};

export const ZoomVariables = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};
