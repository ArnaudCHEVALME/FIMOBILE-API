module.exports = app => {
    const sousGenre = require("../controllers/sousGenre.controller.js");
    const router = require("express").Router();

    // Create a new sousGenre
    router.post("/", sousGenre.create);

    // Retrieve all sousGenres
    router.get("/", sousGenre.findAll);

    // Retrieve a single sousGenre with id
    router.get("/:id", sousGenre.findOne);

    // Update a sousGenre with id
    router.put("/:id", sousGenre.update);

    // Delete a sousGenre with id
    router.delete("/:id", sousGenre.delete);

    // Create a new sousGenre
    router.delete("/", sousGenre.deleteAll);

    app.use('/sousGenre', router);
};