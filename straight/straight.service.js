export default class StraightService {

    CDAStraight(firstPoint, secondPoint){
        try {
            firstPoint = JSON.parse(firstPoint);
            secondPoint = JSON.parse(secondPoint);
        } catch (e) {
            return 'Coordinates must be an object';
        }

        const N = 100;
        const result = [];
        const xIncrement = this.findXCoordinationIncrement(firstPoint, secondPoint) / N;
        const yIncrement = this.findYCoordinationIncrement(firstPoint, secondPoint) / N;

        for(let i = 0; i <= N; i+=1 ){
            firstPoint.x = firstPoint.x - 0 + xIncrement;
            firstPoint.y = firstPoint.y - 0 + yIncrement;
            result.push({ x: firstPoint.x, y: firstPoint.y });
            // console.log({ x: firstPoint.x, y: firstPoint.y, i: i });
        }
        return result;
    }

    BrezStraight(firstPoint, secondPoint){
        try {
            firstPoint = JSON.parse(firstPoint);
            secondPoint = JSON.parse(secondPoint);
        } catch (e) {
            return 'Coordinates must be an object';
        }

        const result = [];
        const deltaX = Math.abs(this.findXCoordinationIncrement(firstPoint, secondPoint));
        const deltaY = Math.abs(this.findYCoordinationIncrement(firstPoint, secondPoint));
        let error = 0;
        const deltaErr = deltaY + 1;
        let y = parseInt(firstPoint.y);
        let difY = secondPoint.y - firstPoint.y;
        if ( difY > 0 ){
            difY = 1;
        } else {
            difY = -1;
        }
        for(let i = parseInt(firstPoint.x); i <= parseInt(secondPoint.x); i += 1){
            result.push({
               x: i,
               y: y,
            });
            error += deltaErr;
            if(error >= (deltaX + 1)){
                y = y + difY;
                error -= (deltaX + 1);
            }
        }
        return result;
    }

    VyStraight(firstPoint, secondPoint){
        try {
            firstPoint = JSON.parse(firstPoint);
            secondPoint = JSON.parse(secondPoint);
        } catch (e) {
            return 'Coordinates must be an object';
        }

        const result = [];
        if(secondPoint.x < firstPoint.x){
            const { x: x2, y: y2 } = secondPoint;
            const { x: x1, y: y1 } = firstPoint;
            firstPoint.x = x2;
            firstPoint.y = y2;
            secondPoint.x = x1;
            secondPoint.y = y1;
        }
        const dx = this.findXCoordinationIncrement(firstPoint, secondPoint);
        const dy = this.findYCoordinationIncrement(firstPoint, secondPoint);
        const gradient = dy / dx;
        let xend = Math.round(firstPoint.x);
        let yend = parseInt(firstPoint.y) + gradient * (xend - parseInt(firstPoint.x));
        let xgapg = 1 - this.fpart(parseInt(firstPoint.x) + 0.5);
        const xpxl1 = xend;
        const ypxl1 = Math.trunc(yend);
        result.push({
            x: xpxl1,
            y: ypxl1,
            c: ((1 - this.fpart(yend)) * xgapg),
        });
        result.push({
            x: xpxl1,
            y: ypxl1 + 1,
            c: this.fpart(yend) * xgapg,
        });
        let intery = yend + gradient;

        xend = Math.round(parseInt(secondPoint.x));
        yend = parseInt(secondPoint.y) + gradient * (xend - parseInt(secondPoint.x));
        let xgap = this.fpart(parseInt(secondPoint.x) + 0.5);
        const xpxl2 = xend;  // будет использоваться в основном цикле
        const ypxl2 = Math.trunc(yend);
        result.push({
            x: xpxl2,
            y: ypxl2,
            c: ((1 - this.fpart(yend)) * xgap),
        });
        result.push({
            x: xpxl2,
            y: ypxl2 + 1,
            c: this.fpart(yend) * xgap,
        });
        for (let i = xpxl1 + 1; i <= xpxl2 - 1; i++){
            result.push({
                x: i,
                y: Math.trunc(intery),
                c: (1 - this.fpart(intery)),
            });
            result.push({
                x: i,
                y: Math.trunc(intery) + 1,
                c: this.fpart(intery),
            });
            intery += gradient;
        }
        return result;
    }

    fpart(x) {
        return x % 1;
    }

    findXCoordinationIncrement(firstPoint, secondPoint){
        return (secondPoint.x - firstPoint.x);
    }

    findYCoordinationIncrement(firstPoint, secondPoint){
        return (secondPoint.y - firstPoint.y);
    }
}

