export default class CurvController {
    constructor(curvService) {
        this.curvService = curvService;
    }

    createCircle(Xcenter, Ycenter, radius) {
        return this.curvService.createCircle(Xcenter, Ycenter, radius);
    }

    createEllipse(a, b, Xc, Yc) {
        return this.curvService.createEllipse(a, b, Xc, Yc);
    }

    createFirstHyp(a, b) {
        return this.curvService.createFirstHyp(a, b);
    }

    createSecondHyp(a) {
        return this.curvService.createSecondHyp(a);
    }

    createThirdHyp(p, start, end) {
        return this.curvService.createThirdHyp(p, start, end);
    }

    drawCurveErmit(points) {
        return this.curvService.drawCurveErmit(points);
    }

    drawCurveBezie(points) {
        return this.curvService.drawCurveBezie(points);
    }

    drawCurveBSpline(points) {
        return this.curvService.drawCurveBSpline(points);
    }
}
