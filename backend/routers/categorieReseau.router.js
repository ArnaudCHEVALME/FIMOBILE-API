module.exports = app => {
    const categoriesReseaux = require("../controllers/categorieReseau.controller");
    const router = require("express").Router();

    // Create a new Genre
    router.post("/", categoriesReseaux.create);

    // Retrieve all Genres
    router.get("/", categoriesReseaux.findAll);

    // Retrieve a single Genre with id
    router.get("/:id", categoriesReseaux.findOne);

    // Update a Genre with id
    router.put("/:id", categoriesReseaux.update);

    // Delete a Genre with id
    router.delete("/:id", categoriesReseaux.delete);

    // Create a new Genre
    router.delete("/", categoriesReseaux.deleteAll);

    app.use('/categoriesReseaux', router);
};