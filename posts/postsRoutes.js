const express = require("express");
const db = require("../data/db.js");

const router = express.Router();

let postId = 50;
router.post("/", (req, res) => {
    const { title, contents } = req.body;
    const post = { title, contents, id: postId };
    console.log(postId);
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

router.post("/:id/comments", (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const comment = { text, post_id: id };
    console.log(id);
    !text ? res.status(400).json({errorMessage: "Please provide text for the comment."}) : null;

    db.findById(id)
    .then(post => {
        post ? null : res.status(404).json({message: "The post with the specified ID does not exist"})
    })
    .catch(err => {
        res.status(500).json({message: "There was an error while finding the post by the ID"})
    })

    db.insertComment(comment)
    .then(com => {
        res.status(201).json(com);
    })
    .catch(err => {
        res.status(500).json({error: "There was an error while saving the comment to the database."})
    })
})

router.get("/", (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    console.log('aoweifj')
    db.findById(id)
    .then(post => {
        console.log(post);
        post.length >= 1 ? res.status(200).json(post) : res.status(404).json({message: "The post with the specified ID does not exist."})
    })
    .catch(err => {
        res.status(500).json({error: "The post information could not be retrieved."})
    })
})

router.get("/:id/comments", (req, res) => {
    const { id } = req.params;

    db.findCommentById(id)
    .then(comment => {
        console.log(comment);
        comment.length >= 1 ? res.status(200).json(comment) : res.status(404).json({message: "The comment with the specified ID does not exist."})
    })
    .catch(err => {
        res.status(500).json({error: "The comment information could not be retrieved."})
    })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(post => {
        console.log(post); 
        post.length >= 1 ? null : res.status(404).json({message: "The post with the specified ID does not exist."})
    })
    .catch(err => {
        res.status(500).json({error: "The post with the idea could not be retrieved."})
    })

    db.remove(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({erro: "The post could not be removed."})
    })
})

router.put("/:id", (req, res) => {
    const { id } = req.params;

    const { title, contents } = req.body;
    const post = { title, contents, id };

    db.findById(id)
    .then(post => {
        console.log(post); 
        post.length >= 1 ? null : res.status(404).json({message: "The post with the specified ID does not exist."})
    })
    .catch(err => {
        res.status(500).json({error: "The post with the idea could not be retrieved."})
    })

    !title || !contents ? res.status(400).json({errorMessage: "Please provide title and contents for the post."}) : null;

    db.update(id, post)
    .then(item => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({error: "The post information could not be modified."})
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