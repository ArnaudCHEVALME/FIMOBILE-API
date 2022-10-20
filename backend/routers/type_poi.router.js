module.exports = app => {
    const type_poi = require("../controllers/type_poi.controller.js");
    const router = require("express").Router();

    // Create a new Genre
    router.post("/", type_poi.create);

    // Retrieve all Genres
    router.get("/", type_poi.findAll);

    // Retrieve a single Genre with id
    router.get("/:id", type_poi.findOne);

    // Update a Genre with id
    router.put("/:id", type_poi.update);

    // Delete a Genre with id
    router.delete("/:id", type_poi.delete);

    // Create a new Genre
    router.delete("/", type_poi.deleteAll);

    app.use('/type_poi', router);
};