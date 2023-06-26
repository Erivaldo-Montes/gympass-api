export interface Coordinates {
  longitude: number
  latitude: number
}

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180
}

export function getDistanceBetweenCoodintes(
  from: Coordinates,
  to: Coordinates,
) {
  const R = 6371

  const diffLatitute = toRadians(from.latitude - to.latitude)
  const diffLongitude = toRadians(from.longitude - to.longitude)

  const a =
    Math.sin(diffLatitute / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) *
      Math.cos(toRadians(to.latitude)) *
      Math.sin(diffLongitude / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = R * c
  return distance

  // if (from.latitude === to.latitude && from.longitude === to.longitude) {
  //   return 0
  // }

  // const fromRadian = (Math.PI * from.latitude) / 180
  // const toRadian = (Math.PI * to.latitude) / 180

  // const theta = from.longitude - to.longitude
  // const radTheta = (Math.PI * theta) / 180

  // let dist =
  //   Math.sin(fromRadian) *
  //   Math.sin(toRadian) *
  //   Math.cos(fromRadian) *
  //   Math.cos(toRadian) *
  //   Math.cos(radTheta)

  // if (dist > 1) {
  //   dist = 1
  // }

  // dist = Math.acos(dist)
  // dist = (dist * 180) / Math.PI
  // dist = dist * 60 * 1.1515
  // dist = dist * 1.609344

  // return dist?
}
