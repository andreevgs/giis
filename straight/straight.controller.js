export default class StraightController {
    constructor(straightService) {
        this.straightService = straightService;
    }

    createStraight(firstPoint, secondPoint, method){
        switch (method){
            case 'CDA':
                return this.straightService.CDAStraight(firstPoint,secondPoint);
                break;
            case'Brez':
                return this.straightService.BrezStraight(firstPoint,secondPoint);
                break;
            case'VY':
                return this.straightService.VyStraight(firstPoint,secondPoint);
                break;
        }
    }
}
