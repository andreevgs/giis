export default class CurvController {
    constructor(curvService) {
        this.curvService = curvService;
    }

    createCircle(Xcenter, Ycenter, radius) {
        return this.curvService.createCircle(Xcenter, Ycenter, radius);
    }

    createEllipse(a, b) {
        return this.curvService.createEllipse(a, b);
    }

    createFirstHyp(a, b, start, end) {
        return this.curvService.createFirstHyp(a, b, start, end);
    }

    createSecondHyp(a, b, start, end) {
        return this.curvService.createSecondHyp(a, b, start, end);
    }

    createThirdHyp(p, start, end) {
        return this.curvService.createThirdHyp(p, start, end);
    }
}
