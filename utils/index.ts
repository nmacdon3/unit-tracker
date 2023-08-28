export function convertToNumber(value: string) {
  if (value === "") {
    return 0;
  }
  return parseInt(value);
}

export function calculateUnits(volume: number, abv: number) {
  return (abv * volume) / 1000;
}
