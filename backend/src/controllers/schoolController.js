const SchoolModel = require('../models/schoolModel');
const { sortSchoolsByDistance } = require('../utils/distanceCalculator');
class SchoolController {
    static async addSchool(req, res, next) {
        try {
            const { name, address, latitude, longitude } = req.body;
            if (!name || !address || !latitude || !longitude) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required'
                });
            }
            const newSchool = await SchoolModel.create({
                name: name.trim(),
                address: address.trim(),
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            });
            res.status(201).json({
                success: true,
                message: 'School added successfully',
                data: newSchool
            });
        } catch (error) {
            next(error);
        }
    }
    static async listSchools(req, res, next) {
        try {
            const { latitude, longitude } = req.query;
            const userLat = parseFloat(latitude);
            const userLon = parseFloat(longitude);
            const schools = await SchoolModel.getAll();
            if (schools.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: 'No schools found',
                    data: [],
                    total: 0
                });
            }
            const sortedSchools = sortSchoolsByDistance(schools, userLat, userLon);
            res.status(200).json({
                success: true,
                message: 'Schools retrieved successfully',
                data: sortedSchools,
                total: sortedSchools.length,
                user_location: { 
                    latitude: userLat,    
                    longitude: userLon
                }
            });
        } catch (error) {
            next(error);
        }
    }
    static async getSchoolById(req, res, next) {
        try {
            const { id } = req.params;
            const school = await SchoolModel.getById(id);
            if (!school) {
                return res.status(404).json({
                    success: false,
                    message: 'School not found'
                });
            }
            res.status(200).json({
                success: true,
                data: school
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = SchoolController;