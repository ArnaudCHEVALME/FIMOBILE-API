module.exports = app => {
    const couleurs = require("../controllers/couleurs.controller.js");
    const router = require("express").Router();

    // Create a new couleurs
    router.post("/", couleurs.create);

    // Retrieve all couleurs
    router.get("/", couleurs.findAll);

    // Retrieve a single couleurs with id
    router.get("/:id", couleurs.findOne);

    // Update a couleurs with id
    router.put("/:id", couleurs.update);

    // Delete a couleurs with id
    router.delete("/:id", couleurs.delete);

    // Create a new couleurs
    router.delete("/", couleurs.deleteAll);

    app.use('/couleurs', router);
};