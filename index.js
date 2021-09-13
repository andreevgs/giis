import express from 'express'
import { injector } from "./injector.js";

const app = express();

const straightController = injector.getStraightController;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/add', (req, res) => {
    straightController.createStraight(req.query.firstPoint,req.query.secondPoint, req.query.straightMethod);
});
