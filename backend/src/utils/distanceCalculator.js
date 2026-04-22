const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return parseFloat(distance.toFixed(2));
};
const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};
const sortSchoolsByDistance = (schools, userLat, userLon) => {
    const schoolsWithDistance = schools.map(school => ({
        ...school,
        distance_km: calculateDistance(
            userLat, 
            userLon, 
            parseFloat(school.latitude), 
            parseFloat(school.longitude)
        )
    }));
    
    return schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);
};
module.exports = { calculateDistance, sortSchoolsByDistance };