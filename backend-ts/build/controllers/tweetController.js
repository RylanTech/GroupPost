"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTweet = exports.getUserPosts = exports.updateTweet = exports.getPost = exports.createTweet = exports.getAllTweets = void 0;
const tweets_1 = require("../models/tweets");
const auth_1 = require("../services/auth");
const getAllTweets = async (req, res, next) => {
    let tweets = await tweets_1.Tweet.findAll();
    res.status(200).json(tweets);
};
exports.getAllTweets = getAllTweets;
const createTweet = async (req, res, next) => {
    //checking login
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newTweet = req.body;
    console.log(newTweet);
    newTweet.userId = user.userId;
    if (newTweet.content) {
        let created = await tweets_1.Tweet.create(newTweet);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createTweet = createTweet;
const getPost = async (req, res, next) => {
    let tweetId = req.params.id;
    console.log(tweetId);
    let tweet = await tweets_1.Tweet.findByPk(tweetId);
    if (tweet) {
        res.status(200).json(tweet);
    }
    else {
        res.status(404).json();
    }
};
exports.getPost = getPost;
const updateTweet = async (req, res, next) => {
    let tweetId = req.params.id;
    let newTweet = req.body;
    //checking login
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let tweetFound = await tweets_1.Tweet.findByPk(tweetId);
    newTweet.tweetId = parseInt(tweetId);
    console.log(newTweet);
    if (tweetFound && tweetFound.tweetId == newTweet.tweetId
        && newTweet.content) {
        await tweets_1.Tweet.update(newTweet, {
            where: { tweetId: tweetId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.updateTweet = updateTweet;
const getUserPosts = async (req, res, next) => {
    let postId = req.params.id;
    let posts = await tweets_1.Tweet.findAll({ where: { userId: postId } });
    console.log(posts);
    if (posts) {
        return res.status(200).json(posts);
    }
    else {
        return res.status(200).send();
    }
};
exports.getUserPosts = getUserPosts;
const deleteTweet = async (req, res, next) => {
    let tweetId = req.params.id;
    let found = await tweets_1.Tweet.findByPk(tweetId);
    //checking login
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    if (found) {
        await tweets_1.Tweet.destroy({
            where: { tweetId: tweetId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deleteTweet = deleteTweet;
