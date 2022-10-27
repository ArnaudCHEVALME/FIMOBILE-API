module.exports = app => {
    const type_stand = require("../controllers/type_stand.controller.js");
    const router = require("express").Router();

    // Create a new Genre
    router.post("/", type_stand.create);

    // Retrieve all Genres
    router.get("/", type_stand.findAll);

    // Retrieve a single Genre with id
    router.get("/:id", type_stand.findOne);

    // Update a Genre with id
    router.put("/:id", type_stand.update);

    // Delete a Genre with id
    router.delete("/:id", type_stand.delete);

    // Create a new Genre
    router.delete("/", type_stand.deleteAll);

    app.use('/type_stand', router);
};