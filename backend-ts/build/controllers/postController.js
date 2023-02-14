"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.getUserPosts = exports.updatePost = exports.getPost = exports.createPost = exports.getAllPosts = void 0;
const posts_1 = require("../models/posts");
const auth_1 = require("../services/auth");
const getAllPosts = async (req, res, next) => {
    let posts = await posts_1.Post.findAll();
    res.status(200).json(posts);
};
exports.getAllPosts = getAllPosts;
const createPost = async (req, res, next) => {
    //checking login
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newPost = req.body;
    console.log(newPost);
    newPost.userId = user.userId;
    if (newPost.content) {
        let created = await posts_1.Post.create(newPost);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createPost = createPost;
const getPost = async (req, res, next) => {
    let postId = req.params.id;
    console.log(postId);
    let post = await posts_1.Post.findByPk(postId);
    if (post) {
        res.status(200).json(post);
    }
    else {
        res.status(404).json();
    }
};
exports.getPost = getPost;
const updatePost = async (req, res, next) => {
    let postId = req.params.id;
    let newPost = req.body;
    //checking login
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let postFound = await posts_1.Post.findByPk(postId);
    newPost.postId = parseInt(postId);
    if (postFound && postFound.postId == newPost.postId
        && newPost.content) {
        await posts_1.Post.update(newPost, {
            where: { postId: postId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.updatePost = updatePost;
const getUserPosts = async (req, res, next) => {
    let postId = req.params.id;
    let posts = await posts_1.Post.findAll({ where: { userId: postId } });
    console.log(posts);
    if (posts) {
        return res.status(200).json(posts);
    }
    else {
        return res.status(200).send();
    }
};
exports.getUserPosts = getUserPosts;
const deletePost = async (req, res, next) => {
    let postId = req.params.id;
    let found = await posts_1.Post.findByPk(postId);
    //checking login
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    if (found) {
        await posts_1.Post.destroy({
            where: { postId: postId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deletePost = deletePost;
