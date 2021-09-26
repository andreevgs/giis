import express from 'express'
import { injector } from "./injector.js";
import cors from 'cors';

const corsOptions = {
    origin: '*'
};

const app = express();

const straightController = injector.getStraightController;

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/add', (req, res) => {
    const straight = straightController.createStraight(req.query.firstPoint,req.query.secondPoint, req.query.straightMethod);
    res.send(straight);
});

app.listen(3000, () => {
    console.log(`Express web app available at localhost 3000`);
});