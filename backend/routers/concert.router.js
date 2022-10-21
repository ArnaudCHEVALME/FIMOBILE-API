const concerts = require("../controllers/genre.controller");
module.exports = app => {
    const concerts = require("../controllers/concert.controller.js");
    const router = require("express").Router();

    // Create a new Genre
    router.post("/", concerts.create);

    // Retrieve all Genres
    router.get("/", concerts.findAll);

    // Retrieve a single Genre with id
    router.get("/:id", concerts.findOne);

    // Update a Genre with id
    router.put("/:id", concerts.update);

    // Delete a Genre with id
    router.delete("/:id", concerts.delete);

    // Create a new Genre
    router.delete("/", concerts.deleteAll);

    app.use('/genres', router);
};