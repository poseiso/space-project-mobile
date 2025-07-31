const palette = {
  neutral900: "#F0F8FF",
  neutral800: "#C0D6E4",
  neutral700: "#8DA5BA",
  neutral600: "#5F6F7A",
  neutral500: "#3F4A52",
  neutral400: "#2A2F36",
  neutral300: "#1D2025",
  neutral200: "#0F1115",
  neutral100: "#000000",

  primary600: "#E6E2F3",
  primary500: "#C1B7E2",
  primary400: "#A78EE1",
  primary300: "#8D5CDB",
  primary200: "#6C36BD",
  primary100: "#4C238F",

  secondary500: "#D2ECF2",
  secondary400: "#9CD1E8",
  secondary300: "#60AEE0",
  secondary200: "#3C85B4",
  secondary100: "#2B5D80",

  accent500: "#FFF6D1",
  accent400: "#FFE47C",
  accent300: "#FFD347",
  accent200: "#FFB800",
  accent100: "#D78A00",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(15, 17, 21, 0.2)",
  overlay50: "rgba(15, 17, 21, 0.5)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral800,
  textDim: palette.neutral600,
  background: palette.neutral200,
  border: palette.neutral400,
  tint: palette.primary500,
  tintInactive: palette.neutral300,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const
