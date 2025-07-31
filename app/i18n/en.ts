const en = {
  app:{
    title: "Naluri Space Project"
  },
  calculationScreen:{
    piCalculation: "Live Pi Calculation",
    lastUpdated: "Last Updated: {{date}}",
    calculated: "Calculated to {{digit}} digits of precision",
    pause: "Pause",
    resume: "Resume",
    reset: "Reset"
  },
  LoadingScreen:{
    loading: "Loading..."
  },
  planetScreen:{
    title: "Solar System Circumference Calculator",
    togleMeasurement: "Toggle Measurement",
    circumference: "Circumference",
    earth: "Earth",
    sun: "Sun",
    mars: "Mars",
  },
  navigation:{
    pi: "Pi",
    planet: "Planet"
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "Don't panic, try resetting",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
}

export default en
export type Translations = typeof en
