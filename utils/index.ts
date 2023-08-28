import { MeasurementUnit } from "~/app/page";

export function convertToNumber(value: string) {
  if (value === "") {
    return 0;
  }
  return parseInt(value);
}

const MILLILITERS_PER_OUNCE = 29.5735;
const MILLILITERS_PER_SHOT = 44.3603;

function convertToMilliliters(
  volume: number,
  measurementUnits: MeasurementUnit
): number {
  switch (measurementUnits) {
    case "oz":
      return volume * MILLILITERS_PER_OUNCE;
    case "shot":
      return volume * MILLILITERS_PER_SHOT;
    case "ml":
      return volume;
  }
}

export function calculateUnits(
  volume: number,
  abv: number,
  measurementUnits: MeasurementUnit
) {
  const milliliters = convertToMilliliters(volume, measurementUnits);
  return (abv * milliliters) / 1000;
}
