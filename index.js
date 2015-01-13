//http://en.wikipedia.org/wiki/Haversine_formula
//http://www.movable-type.co.uk/scripts/latlong.html

/**
 * Calculates the distance between two {@link Point} features in degrees,
 * radians, miles, or kilometers. This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula)
 * to account for global curvature.
 *
 * @module turf/distance
 * @param {Point} from origin point
 * @param {Point} to destination point
 * @param {String} units can be degrees, radians, miles, or kilometers
 * @return {Number} distance between the two points
 * @example
 * var point1 = turf.point(-75.343, 39.984);
 * var point2 = turf.point(-75.534, 39.123);
 * var units = 'miles';
 *
 * var distance = turf.distance(point1, point2, units);
 * console.log(distance); // 60.37218405837491
 */
module.exports = function(point1, point2, units){
  var coordinates1 = point1.geometry.coordinates;
  var coordinates2 = point2.geometry.coordinates;

  var dLat = toRad(coordinates2[1] - coordinates1[1]);
  var dLon = toRad(coordinates2[0] - coordinates1[0]);
  var lat1 = toRad(coordinates1[1]);
  var lat2 = toRad(coordinates2[1]);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var R = 0;
  switch(units){
    case 'miles':
      R = 3960;
      break;
    case 'kilometers':
      R = 6373;
      break;
    case 'degrees':
      R = 57.2957795;
      break;
    case 'radians':
      R = 1;
      break;
  }
  var distance = R * c;
  return distance;
}

function toRad(degree){
  return degree * Math.PI / 180;
}
