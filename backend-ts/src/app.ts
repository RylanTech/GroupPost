import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import { db } from './models';
import userRoutes from "./routes/userRoutes"
import postRoutes from "./routes/postRoutes"

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin: [ 'http://localhost:3000' ]
};
const cors = require('cors');
app.use(cors(corsOptions));

// routes
app.use("/api/user", userRoutes)
app.use("/api/posts", postRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

// Syncing our database
db.sync({ alter: true }).then(() => {
    console.info("connected to the database!")
});

app.listen(3001);