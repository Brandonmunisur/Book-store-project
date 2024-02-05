// Import the dotenv package if you're not already importing it at the beginning of your application entry point
// You can skip this line if you have 'import "dotenv/config";' at the top of your main application file (like index.js)
import "dotenv/config";

// Exporting the PORT and mongoDBURL by accessing the environment variables
export const PORT = process.env.PORT || 4001; // Default to 5555 if process.env.PORT is not defined
export const mongoDBURL = process.env.mongoDBURL; // Ensure this matches the variable name in your .env file
console.log("MongoDB URL from config.js:", mongoDBURL);
