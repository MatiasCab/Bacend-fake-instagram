import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const CONNECTION_STRING = process.env.ATLAS_URI;

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "fake-instagram"
});

mongoose.connection.on('connected', (err, res) => {
    console.log("Connection ready!");
})

export let mon = mongoose;