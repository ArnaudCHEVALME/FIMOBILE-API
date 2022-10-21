module.exports = app => {
    const saison = require("../controllers/saison.controllers.js");
    const router = require("express").Router();

    // Create a new saison
    router.post("/", saison.create);

    // Retrieve all saison
    router.get("/", saison.findAll);

    // Retrieve a single saison with id
    router.get("/:id", saison.findOne);

    // Update a saison with id
    router.put("/:id", saison.update);

    // Delete a saison with id
    router.delete("/:id", saison.delete);

    // Create a new saison
    router.delete("/", saison.deleteAll);

    app.use('/saison', router);
};