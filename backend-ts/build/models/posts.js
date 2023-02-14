"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserPosts = exports.PostFactory = exports.Post = void 0;
const sequelize_1 = require("sequelize");
const users_1 = require("./users");
class Post extends sequelize_1.Model {
}
exports.Post = Post;
function PostFactory(sequelize) {
    Post.init({
        postId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        }
    }, {
        freezeTableName: true,
        tableName: 'posts',
        sequelize
    });
}
exports.PostFactory = PostFactory;
function AssociateUserPosts() {
    users_1.User.hasMany(Post, { foreignKey: 'userId' });
    Post.belongsTo(users_1.User, { foreignKey: 'userId' });
}
exports.AssociateUserPosts = AssociateUserPosts;
