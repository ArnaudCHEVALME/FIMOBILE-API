module.exports = app => {
    const news = require("../controllers/news.controller.js");
    const router = require("express").Router();

    // Create a new Genre
    router.post("/", news.create);

    // Retrieve all Genres
    router.get("/", news.findAll);

    // Retrieve a single Genre with id
    router.get("/:id", news.findOne);

    // Update a Genre with id
    router.put("/:id", news.update);

    // Delete a Genre with id
    router.delete("/:id", news.delete);

    // Create a new Genre
    router.delete("/", news.deleteAll);

    app.use('/news', router);
};