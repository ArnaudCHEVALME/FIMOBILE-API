module.exports = app => {
    const genres = require("../controllers/genre.controller.js");
    const router = require("express").Router();

    // Create a new Genre
    router.post("/", genres.create);

    // Retrieve all Genres
    router.get("/", genres.findAll);

    // Retrieve a single Genre with id
    router.get("/:id", genres.findOne);

    // Update a Genre with id
    router.put("/:id", genres.update);

    // Delete a Genre with id
    router.delete("/:id", genres.delete);

    // Create a new Genre
    router.delete("/", genres.deleteAll);

    app.use('/genres', router);
};