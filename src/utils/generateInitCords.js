export function generateInitCords(numberOfItems) {
  // the metropolitan adelaide cordinates
  const minLatitude = -34.88;
  const maxLatitude = -35.1;
  const minLongitude = 138.5646;
  const maxLongitude = 138.6;

  const result = [];

  for (let i = 0; i < numberOfItems; i++) {
    const latitude = getRandomNumber(minLatitude, maxLatitude);
    const longitude = getRandomNumber(minLongitude, maxLongitude);
    result.push({ id: i + 1, cord: [latitude, longitude] });
  }

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  return result;
}
