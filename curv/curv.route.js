import express from 'express'
import { injector } from '../injector';

const app = express();

const curvController = injector.getCurvController;

app.get('/circle', (req, res) => {
    const straight = curvController.createCircle(req.query.Xcenter, req.query.Ycenter, req.query.radius);
    res.send(straight);
});

app.get('/ellipse', (req, res) => {
    const straight = curvController.createEllipse(req.query.a, req.query.b);
    res.send(straight);
});

app.get('/hyp/first', (req, res) => {
    const straight = curvController.createFirstHyp(req.query.a, req.query.b, req.query.start, req.query.end);
    res.send(straight);
});

app.get('/hyp/second', (req, res) => {
    const straight = curvController.createSecondHyp(req.query.a, req.query.b, req.query.start, req.query.end);
    res.send(straight);
});

app.get('/hyp/third', (req, res) => {
    const straight = curvController.createThirdHyp(req.query.p, req.query.start, req.query.end);
    res.send(straight);
});

export default app;
