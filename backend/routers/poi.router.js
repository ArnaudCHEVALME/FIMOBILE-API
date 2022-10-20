module.exports = app => {
    const poi = require("../controllers/poi.controller.js");
    const router = require("express").Router();

    // Create a new poi
    router.post("/", poi.create);

    // Retrieve all poi
    router.get("/", poi.findAll);

    // Retrieve a single poi with id
    router.get("/:id", poi.findOne);

    // Update a poi with id
    router.put("/:id", poi.update);

    // Delete a poi with id
    router.delete("/:id", poi.delete);

    // Create a new poi
    router.delete("/", poi.deleteAll);

    app.use('/poi', router);
};