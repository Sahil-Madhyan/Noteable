const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/noteable";


connectToMongo()
    .then(() => console.log("MongoDB Successfully Connected")) 
    .catch((err) => console.error("MongoDB Connection Error:", err));

//? This function is used to connect to the MongoDB database
async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI, {
            family: 4
        });
    } catch (err) {
        throw new Error(err);
    }
}

//? Exporting the connectToMongo function
module.exports = connectToMongo;
