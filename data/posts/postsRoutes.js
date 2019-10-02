const express = require("express");

const db = require("../data/db.js");

const router = express.Router();

let postId = 0;

router.get("/", (req, res) => {
    res.send("YOYOYOYO")
})

router.post("/", (req, res) => {
    const { title, contents } = req.body;
    const post = { title, contents, id: postId };
    postId++;

    !title || !contents ? res.status(400).json({errorMessage: "Please provide title and contents for the post."}) : null;

    db.insert(post)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json({error: "There was an error while saving the post to the database"})
    })
})

module.exports = router;







/*
```js
{
  title: "The post title", // String, required
  contents: "The post contents", // String, required
  created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
  updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
}
```
*/