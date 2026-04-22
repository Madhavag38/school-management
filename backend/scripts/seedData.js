const { promisePool } = require('../src/config/database');
const sampleSchools = [
    ['Delhi Public School', 'New Delhi', 28.6139, 77.2090],
    ['Mumbai International School', 'Mumbai', 19.0760, 72.8777],
    ['Bangalore Central School', 'Bangalore', 12.9716, 77.5946],
    ['Chennai Public School', 'Chennai', 13.0827, 80.2707],
    ['Kolkata High School', 'Kolkata', 22.5726, 88.3639]
];
async function seedDatabase() {
    try {
        console.log('Seeding database...');
        for (const school of sampleSchools) {
            await promisePool.execute(
                'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
                school
            );
        }
        console.log('Sample schools added successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error.message);
        process.exit(1);
    }
}
seedDatabase();
