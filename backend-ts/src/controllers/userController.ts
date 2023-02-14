import { RequestHandler } from "express";
import { User } from "../models/users";
import { comparePasswords, hashPassword, signUserToken, verifyUser } from "../services/auth";

export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = req.body;
    console.log(newUser)
    if (newUser.username && newUser.password && newUser.email && newUser.number) {
        let hashedPassword = await hashPassword(newUser.password);
        newUser.password = hashedPassword;
        let created = await User.create(newUser);
        res.status(201).json({
            username: created.username,
            userId: created.userId
        });
    }
    else {
        res.status(400).send('Username and password required');
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {
    // Look up user by their username
    console.log(req.body)
    let existingUser: User | null = await User.findOne({
        where: { username: req.body.username }
    });

    // If user exists, check that password matches
    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);

        // If passwords match, create a JWT
        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            let userId = existingUser.userId
            let userAndToken = {
                token,
                userId
            }
            res.status(200).json({ userAndToken });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
}

export const isLoggedIn: RequestHandler = async (req, res, next) => {
    let result = await verifyUser(req);

    if (result) {
        res.status(200).json(result.dataValues)
    } else {
        res.status(200).json(false)
    }
}

export const getUser: RequestHandler = async (req, res, next) => {
    let sameUser: User | null = await verifyUser(req);
    let reqId = parseInt(req.params.id);
    let user: User | null = await User.findByPk(req.params.id)

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
        } else if (user) {
            let { username, email, createdAt } = user.dataValues
            res.status(200).json({
                username,
                email,
                createdAt
            });
        }
    } else {
        res.status(404).json();
    }
}

export const editUser: RequestHandler = async (req, res, next) => {
    let sameUser: User | null = await verifyUser(req);
    let updatedUser: User = req.body
    console.log(req.body.username)
    let reqId = parseInt(req.params.id);

    console.log(updatedUser)


    if (sameUser && sameUser.userId == updatedUser.userId && updatedUser.username && updatedUser.email &&
        updatedUser.number) {
        if (sameUser) {

            if (sameUser.userId == reqId) {
                //checks to see if the user is the same
                await User.update(updatedUser, { where: { userId: reqId } } );
                res.status(200).send()
    
            } else {
                res.status(401).send();
            }
        } else {
            res.status(401).send();
        }
    }
}