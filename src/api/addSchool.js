import db from "../index.js"
const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Validate inputs
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).send('All fields are required');
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) return res.status(500).send('Error adding school');
        res.status(201).send('School added successfully');
    });
};

export {addSchool}