const { Product } = require("../models");
const { Op } = require("sequelize");

// Get products with pagination, filtering, and searching
exports.getProducts = async (req, res) => {

    try {

        // Get values from the URL
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category;
        const search = req.query.search;

        // Calculate how many records to skip
        const offset = (page - 1) * limit;

        // Start with an empty filter
        const where = {};

        // Filter by category if category was provided
        if (category) {
            where.category = category;
        }

        // Search inside the product name
        if (search) {
            where.name = {
                [Op.like]: `%${search}%`
            };
        }

        // Get matching products
        const { count, rows } = await Product.findAndCountAll({

            // Apply our filters
            where: where,

            // Number of products to return
            limit: limit,

            // Number of products to skip
            offset: offset

        });

        // Calculate total pages
        const totalPages = Math.ceil(count / limit);

        // Send response
        res.json({
            page: page,
            limit: limit,
            total: count,
            totalPages: totalPages,
            data: rows
        });

    } catch (error) {

        // Send error if something goes wrong
        res.status(500).json({
            message: error.message
        });

    }
};