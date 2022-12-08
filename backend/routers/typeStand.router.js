module.exports = app => {
    const typeStand = require("../controllers/typeStand.controller.js");
    const router = require("express").Router();

    // Create a new Genre
    router.post("/", typeStand.create);

    // Retrieve all Genres
    router.get("/", typeStand.findAll);

    // Retrieve a single Genre with id
    router.get("/:id", typeStand.findOne);

    // Update a Genre with id
    router.put("/:id", typeStand.update);

    // Delete a Genre with id
    router.delete("/:id", typeStand.delete);

    // Create a new Genre
    router.delete("/", typeStand.deleteAll);

    app.use('/typeStand', router);
};