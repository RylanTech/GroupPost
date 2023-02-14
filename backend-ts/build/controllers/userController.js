"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.getUser = exports.isLoggedIn = exports.loginUser = exports.createUser = void 0;
const users_1 = require("../models/users");
const auth_1 = require("../services/auth");
const createUser = async (req, res, next) => {
    let newUser = req.body;
    console.log(newUser);
    if (newUser.username && newUser.password && newUser.email && newUser.number) {
        let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
        newUser.password = hashedPassword;
        let created = await users_1.User.create(newUser);
        res.status(201).json({
            username: created.username,
            userId: created.userId
        });
    }
    else {
        res.status(400).send('Username and password required');
    }
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    // Look up user by their username
    console.log(req.body);
    let existingUser = await users_1.User.findOne({
        where: { username: req.body.username }
    });
    // If user exists, check that password matches
    if (existingUser) {
        let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        // If passwords match, create a JWT
        if (passwordsMatch) {
            let token = await (0, auth_1.signUserToken)(existingUser);
            let userId = existingUser.userId;
            let userAndToken = {
                token,
                userId
            };
            res.status(200).json({ userAndToken });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
};
exports.loginUser = loginUser;
const isLoggedIn = async (req, res, next) => {
    let result = await (0, auth_1.verifyUser)(req);
    if (result) {
        res.status(200).json(result.dataValues);
    }
    else {
        res.status(200).json(false);
    }
};
exports.isLoggedIn = isLoggedIn;
const getUser = async (req, res, next) => {
    let sameUser = await (0, auth_1.verifyUser)(req);
    let reqId = parseInt(req.params.id);
    let user = await users_1.User.findByPk(req.params.id);
    if (sameUser) {
        if (sameUser.userId == reqId) {
            //checks to see if the user is the same as user that has requested the information
            let { username, userId, email, number, createdAt, updatedAt } = sameUser;
            res.status(200).json({
                username,
                userId,
                email,
                number,
                createdAt,
                updatedAt
            });
        }
        else if (user) {
            let { username, email, createdAt } = user.dataValues;
            res.status(200).json({
                username,
                email,
                createdAt
            });
        }
    }
    else {
        res.status(404).json();
    }
};
exports.getUser = getUser;
const editUser = async (req, res, next) => {
    let sameUser = await (0, auth_1.verifyUser)(req);
    let updatedUser = req.body;
    console.log(req.body.username);
    let reqId = parseInt(req.params.id);
    console.log(updatedUser);
    if (sameUser && sameUser.userId == updatedUser.userId && updatedUser.username && updatedUser.email &&
        updatedUser.number) {
        if (sameUser) {
            if (sameUser.userId == reqId) {
                //checks to see if the user is the same
                await users_1.User.update(updatedUser, { where: { userId: reqId } });
                res.status(200).send();
            }
            else {
                res.status(401).send();
            }
        }
        else {
            res.status(401).send();
        }
    }
};
exports.editUser = editUser;
