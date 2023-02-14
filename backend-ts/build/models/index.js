"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const posts_1 = require("./posts");
const users_1 = require("./users");
const dbName = 'grouppostDB';
const username = 'root';
const password = '0624';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
(0, posts_1.PostFactory)(sequelize);
(0, users_1.UserFactory)(sequelize);
(0, posts_1.AssociateUserPosts)();
exports.db = sequelize;
