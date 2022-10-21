const reseaux = require("../controllers/reseau.controller");
module.exports = app => {
    const reseaux = require("../controllers/reseau.controller.js");
    const router = require("express").Router();

    // Create a new Genre
    router.post("/", reseaux.create);

    // Retrieve all Genres
    router.get("/", reseaux.findAll);

    // Retrieve a single Genre with id
    router.get("/:id", reseaux.findOne);

    // Update a Genre with id
    router.put("/:id", reseaux.update);

    // Delete a Genre with id
    router.delete("/:id", reseaux.delete);

    // Create a new Genre
    router.delete("/", reseaux.deleteAll);

    app.use('/reseaux', router);
};