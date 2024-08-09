import { IColors, IColorsPattern } from "@/types/Theme";

const baseColors: IColorsPattern = {
  0: "#FFFFFF",
  50: "#F7F7F7",
  100: "#EDEDED",
  200: "#DEDEDE",
  300: "#CCCCCC",
  400: "#B3B3B3",
  500: "#9C9C9C",
  600: "#707070",
  700: "#595959",
  800: "#404040",
  900: "#2E2E2E",
  1000: "#121212",
  1100: "#000000",
};

const lightColors: IColors = {
  primary: {
    0: "#E4D9EE",
    50: "#CAAFE3",
    100: "#B180DF",
    200: "#9B51E0",
    300: "#8824E6",
    400: "#720ECF",
    500: "#54079D",
    600: "#38006C",
    700: "#1E0052",
  },
  secondary: baseColors,
  text: baseColors,
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  warning: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fed7aa",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
  },
  info: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
};

const darkColors = {
  secondary: baseColors,
};

export { lightColors, darkColors, baseColors };
