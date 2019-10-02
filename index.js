const express = require("express");

const postsRoutes = require("./posts/postsRoutes");

const server = express();

server.use(express.json())
server.use("/api/posts", postsRoutes);

server.listen(5000, () => console.log("API running on port 5000"))