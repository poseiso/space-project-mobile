type Unit = "km" | "mi"

/**
 * Calculates the circumference of a planet/star based on radius and Pi.
 * @param radiusKm - Radius in kilometers
 * @param pi - Pi value to use
 * @param unit - "km" or "mi"
 * @returns Circumference in selected unit
 */
export function getCircumference(radiusKm: number, pi: string, unit: Unit = "km"): number {
  const KM_TO_MI = 0.621371
  const circumference = 2 * Number(pi) * radiusKm

  return unit === "mi"
    ? circumference * KM_TO_MI
    : circumference
}


// KM
export const PLANETARY_RADII_KM = {
  sun: 696_340,
  earth: 6_371,
  mars: 3_389.5,
}
