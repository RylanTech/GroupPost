"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.put("/:id", userController_1.editUser);
router.post('/', userController_1.createUser);
router.post('/login', userController_1.loginUser);
router.get("/isloggedin", userController_1.isLoggedIn);
router.get('/:id', userController_1.getUser);
exports.default = router;
