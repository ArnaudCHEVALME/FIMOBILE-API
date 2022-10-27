module.exports = app => {
    const stand = require("../controllers/stand.controller.js");
    const router = require("express").Router();

    // Create a new stand
    router.post("/", stand.create);

    // Retrieve all stand
    router.get("/", stand.findAll);

    // Retrieve a single stand with id
    router.get("/:id", stand.findOne);

    // Update a stand with id
    router.put("/:id", stand.update);

    // Delete a stand with id
    router.delete("/:id", stand.delete);

    // Create a new stand
    router.delete("/", stand.deleteAll);

    app.use('/stand', router);
};