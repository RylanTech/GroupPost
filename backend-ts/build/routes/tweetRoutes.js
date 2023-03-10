"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweetController_1 = require("../controllers/tweetController");
const router = (0, express_1.Router)();
router.get('/user/:id', tweetController_1.getUserPosts);
router.get('/:id', tweetController_1.getPost);
router.get('/', tweetController_1.getAllTweets);
router.post('/', tweetController_1.createTweet);
router.put('/:id', tweetController_1.updateTweet);
router.delete('/:id', tweetController_1.deleteTweet);
exports.default = router;
