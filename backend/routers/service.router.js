module.exports = app => {
    const service = require("../controllers/saison.controllers.js");
    const router = require("express").Router();

    // Create a new service
    router.post("/", service.create);

    // Retrieve all service
    router.get("/", service.findAll);

    // Retrieve a single service with id
    router.get("/:id", service.findOne);

    // Update a service with id
    router.put("/:id", service.update);

    // Delete a service with id
    router.delete("/:id", service.delete);

    // Create a new service
    router.delete("/", service.deleteAll);

    app.use('/service', router);
};