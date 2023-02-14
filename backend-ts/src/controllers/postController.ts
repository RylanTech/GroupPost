import { RequestHandler } from "express";
import { Post } from "../models/posts";
import { User } from "../models/users";
import { verifyUser } from "../services/auth";

export const getAllPosts: RequestHandler = async (req, res, next) => {
    let posts = await Post.findAll();
    res.status(200).json(posts);
}

export const createPost: RequestHandler = async (req, res, next) => {
    //checking login
    let user: User | null = await verifyUser(req);
    if (!user) {
        return res.status(403).send();
    }

    let newPost: Post = req.body;
    console.log(newPost)
    newPost.userId = user.userId;
    if (newPost.content) {
        let created = await Post.create(newPost);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

export const getPost: RequestHandler = async (req, res, next) => {
    let postId = req.params.id;
    console.log(postId)
    let post = await Post.findByPk(postId);
    if (post) {
        res.status(200).json(post);
    }
    else {
        res.status(404).json();
    }
}

export const updatePost: RequestHandler = async (req, res, next) => {
    let postId = req.params.id;
    let newPost: Post = req.body;

    //checking login
    let user: User | null = await verifyUser(req);
    if (!user) {
        return res.status(403).send();
    }
    
    let postFound = await Post.findByPk(postId);
        newPost.postId = parseInt(postId)
    
        if (postFound && postFound.postId == newPost.postId
            && newPost.content) {
                await Post.update(newPost, {
                    where: { postId: postId }
                });
                res.status(200).json();
        }
        else {
            res.status(400).json();
        }
    }

export const getUserPosts: RequestHandler = async (req, res, next) => {
    let postId = req.params.id
    let posts = await Post.findAll({ where: {userId: postId}})
    console.log(posts)

    if (posts) {
        return res.status(200).json(posts)
    } else {
        return res.status(200).send()
    }
}

export const deletePost: RequestHandler = async (req, res, next) => {
    let postId = req.params.id;
    let found = await Post.findByPk(postId);

    //checking login
    let user: User | null = await verifyUser(req);
    if (!user) {
        return res.status(403).send();
    }
    
    if (found) {
        await Post.destroy({
                where: { postId: postId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}