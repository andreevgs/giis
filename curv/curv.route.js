import express from 'express'
import { injector } from '../injector.js';

const app = express();

const curvController = injector.getCurvController;

app.get('/circle', (req, res) => {
    const straight = curvController.createCircle(req.query.Xcenter, req.query.Ycenter, req.query.radius);
    res.send(straight);
});

app.get('/ellipse', (req, res) => {
    const straight = curvController.createEllipse(req.query.a, req.query.b, req.query.Xc, req.query.Yc);
    res.send(straight);
});

app.get('/hyp/first', (req, res) => {
    const straight = curvController.createFirstHyp(req.query.a, req.query.b);
    res.send(straight);
});

app.get('/hyp/second', (req, res) => {
    const straight = curvController.createSecondHyp(req.query.a);
    res.send(straight);
});

app.get('/hyp/third', (req, res) => {
    const straight = curvController.createThirdHyp(req.query.p, req.query.start, req.query.end);
    res.send(straight);
});

app.get('/ermit', (req, res) => {
    const straight = curvController.drawCurveErmit(JSON.parse(req.query.points));
    res.send(straight);
});

app.get('/bezie', (req, res) => {
    const straight = curvController.drawCurveBezie(JSON.parse(req.query.points));
    res.send(straight);
});

app.get('/spline', (req, res) => {
    const straight = curvController.drawCurveBSpline(JSON.parse(req.query.points));
    res.send(straight);
});

export default app;
