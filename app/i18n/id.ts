const id = {
  app:{
    title: "Naluri Space Project"
  },
  calculationScreen:{
    piCalculation: "Live Pi Calculation",
    lastUpdated: "Terakhir Diupdate: {{date}}",
    calculated: "Dikalkulasikan secara akurat sebanyak {{digit}} digit",
    pause: "Jeda",
    resume: "Lanjutkan",
    reset: "Hapus"
  },
  LoadingScreen:{
    loading: "Memuat..."
  },
  planetScreen:{
    title: "Kalkulator Keliling Planet Tata Surya",
    togleMeasurement: "Toggle Satuan",
    Circumference: "Keliling",
    earth: "Bumi",
    sun: "Matahari",
    mars: "Mars",
  },
  navigation:{
    pi: "Pi",
    planet: "Planet"
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "Jangan panik, coba reset aplikasi",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
}

export default id
export type Translations = typeof id
