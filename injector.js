import StraightService from "./straight/straight.service.js";
import StraightController from "./straight/straight.controller.js";

class Injector{
    constructor() {
        this.straightService = new StraightService();
        this.straightController = new StraightController(this.straightService);
    }

    get getStraightController(){
        return this.straightController;
    }
}

const injector = new Injector();
export { injector };
