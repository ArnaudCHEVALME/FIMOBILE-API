module.exports = app => {
    const categories_reseaux = require("../controllers/categorie_reseau.controller");
    const router = require("express").Router();

    // Create a new Genre
    router.post("/", categories_reseaux.create);

    // Retrieve all Genres
    router.get("/", categories_reseaux.findAll);

    // Retrieve a single Genre with id
    router.get("/:id", categories_reseaux.findOne);

    // Update a Genre with id
    router.put("/:id", categories_reseaux.update);

    // Delete a Genre with id
    router.delete("/:id", categories_reseaux.delete);

    // Create a new Genre
    router.delete("/", categories_reseaux.deleteAll);

    app.use('/categories_reseaux', router);
};