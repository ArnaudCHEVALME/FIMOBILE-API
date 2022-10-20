const express = require("express");
const app = express();


const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, './.env')
})
// set port, listen for requests
const PORT = process.env._FIMU_PORT;
const HOST = process.env._FIMU_HOST;

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`http://${HOST}:${PORT}.`);
});
