export const generateCircle = (
  centerLat: number,
  centerLng: number,
  radius: number,
  numPoints = 36
): { lat: number; lng: number }[] => {
  const circlePoints = [];

  for (let i = 0; i < numPoints; i++) {
    const angle = (i * Math.PI * 2) / numPoints;
    const lat = centerLat + radius * Math.sin(angle);
    const lng =
      centerLng +
      (radius / Math.cos((centerLat * Math.PI) / 180)) * Math.cos(angle);

    circlePoints.push({ lat, lng });
  }

  return circlePoints;
};
