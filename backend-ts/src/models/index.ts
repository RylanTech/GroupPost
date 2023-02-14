import { Sequelize } from "sequelize";
import { AssociateUserPosts, PostFactory} from "./posts";
import { UserFactory } from "./users";

const dbName = 'grouppostDB';
const username = 'root';
const password = '0624';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

PostFactory(sequelize);
UserFactory(sequelize);
AssociateUserPosts();

export const db = sequelize;