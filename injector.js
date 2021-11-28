import StraightService from "./straight/straight.service.js";
import CurvService from "./curv/curv.service.js";
import StraightController from "./straight/straight.controller.js";
import CurvController from "./curv/curv.controller.js";

class Injector{
    constructor() {
        this.straightService = new StraightService();
        this.curvService = new CurvService();

        this.straightController = new StraightController(this.straightService);
        this.curvController = new CurvController(this.curvService);
    }

    get getStraightController(){
        return this.straightController;
    }

    get getCurvController(){
        return this.curvController;
    }
}

const injector = new Injector();
export { injector };
