export default class StraightController {
    constructor(straightService) {
        this.straightService = straightService;
    }

    createStraight(firstPoint, secondPoint, method){
        switch (method){
            case 'CDA':
                return this.straightService.CDAStraight(firstPoint,secondPoint);
            case'Brez':
                return this.straightService.BrezStraight(firstPoint,secondPoint);
            case'VY':
                return this.straightService.VyStraight(firstPoint,secondPoint);
        }
    }
}
