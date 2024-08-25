import db from "../../index.js"

// Calculate the distance between two coordinates 
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
}


const listSchools = (req, res) => {
    const userLat = parseFloat(req.query.userLat);
    const userLong = parseFloat(req.query.userLong);

    if (isNaN(userLat) || isNaN(userLong)) {
        return res.status(400).send('Invalid coordinates');
    }

    const query = 'SELECT * FROM schools';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error fetching schools');

        // Calculate distance and sort
        results.forEach(school => {
            school.distance = calculateDistance(userLat, userLong, school.latitude, school.longitude);
        });
        results.sort((a, b) => a.distance - b.distance);

        res.status(200).json(results);
    });
};

export {listSchools}