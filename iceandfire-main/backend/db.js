require('dotenv').config();

const mongoose = require('mongoose');
const mongoURI =process.env.MONGO_URI;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to database");

        // Fetch food items and categories asynchronously
        const fetchedItems = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const fetchedCategories = await mongoose.connection.db.collection("food_category").find({}).toArray();

        // Check if data is retrieved successfully
        if (!fetchedItems || !fetchedCategories) {
            console.log("No data found for food items or categories");
            global.food_items = [];
            global.food_category = [];
        } else {
            global.food_items = fetchedItems;
            global.food_category = fetchedCategories;
            console.log("Fetched Food Items:", global.food_items);
            console.log("Fetched Food Categories:", global.food_category);
        }
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

module.exports = mongoDB;