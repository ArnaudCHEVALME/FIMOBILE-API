const express = require("express");
const bodyParser = require("body-parser");

const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
})
const app = express();


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Connects to the database
const db = require("./backend/models");

// db.sequelize.sync()
db.sequelize.sync({ force: true }) // For developpement, drop every table
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// Use routes defined in backend/routers
require("./backend/routers/genre.router")(app);

// set port, listen for requests
const PORT = process.env.PORT;
const HOST = process.env.HOST;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`http://${HOST}:${PORT}.`);
});
